interface Env {
  RESEND_API_KEY: string
  TURNSTILE_SECRET_KEY: string
  CONTACT_TO_EMAIL?: string
  CONTACT_FROM_EMAIL?: string
  ALLOWED_ORIGINS?: string
  TURNSTILE_EXPECTED_ACTION?: string
  TURNSTILE_EXPECTED_HOSTNAME?: string
}

interface ContactPayload {
  name: string
  email: string
  message: string
  privacy: boolean
  website: string
  turnstileToken: string
  locale?: string
}

interface TurnstileResult {
  success: boolean
  action?: string
  hostname?: string
  'error-codes'?: string[]
}

const MAX_BODY_BYTES = 32_000
const MAX_NAME_LENGTH = 120
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 5_000
const DEFAULT_RECIPIENT = 'perranube312@gmail.com'

const jsonHeaders = {
  'Content-Type': 'application/json; charset=UTF-8',
  'Cache-Control': 'no-store',
  Vary: 'Origin',
}

function getAllowedOrigins(env: Env): Set<string> {
  return new Set(
    (env.ALLOWED_ORIGINS ?? '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  )
}

function isAllowedOrigin(origin: string | null, env: Env): boolean {
  return !origin || getAllowedOrigins(env).has(origin)
}

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  if (!origin || !isAllowedOrigin(origin, env)) {
    return {}
  }

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

function response(
  body: Record<string, unknown>,
  status: number,
  origin: string | null,
  env: Env,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...jsonHeaders, ...corsHeaders(origin, env) },
  })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(email: string): boolean {
  return email.length <= MAX_EMAIL_LENGTH && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[character] ?? character,
  )
}

function sanitizeSubject(value: string): string {
  return value.replace(/[\r\n]/g, ' ').slice(0, 100)
}

async function verifyTurnstile(
  token: string,
  request: Request,
  env: Env,
): Promise<boolean> {
  const form = new FormData()
  form.append('secret', env.TURNSTILE_SECRET_KEY)
  form.append('response', token)

  const clientIp = request.headers.get('CF-Connecting-IP')
  if (clientIp) {
    form.append('remoteip', clientIp)
  }

  try {
    const verificationResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body: form },
    )

    if (!verificationResponse.ok) {
      return false
    }

    const result = (await verificationResponse.json()) as TurnstileResult
    if (!result.success) {
      return false
    }

    if (
      env.TURNSTILE_EXPECTED_ACTION &&
      result.action !== env.TURNSTILE_EXPECTED_ACTION
    ) {
      return false
    }

    return !(
      env.TURNSTILE_EXPECTED_HOSTNAME &&
      result.hostname !== env.TURNSTILE_EXPECTED_HOSTNAME
    )
  } catch {
    return false
  }
}

async function sendEmail(payload: ContactPayload, env: Env): Promise<boolean> {
  const name = escapeHtml(payload.name)
  const email = escapeHtml(payload.email)
  const message = escapeHtml(payload.message).replace(/\n/g, '<br />')
  const locale = escapeHtml(payload.locale || 'unknown')
  const text = [
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Idioma: ${payload.locale || 'unknown'}`,
    '',
    payload.message,
  ].join('\n')

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'User-Agent': 'paleoware-contact-worker/1.0',
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENT],
      reply_to: payload.email,
      subject: `Nueva consulta de ${sanitizeSubject(payload.name)}`,
      text,
      html: `<h2>Nueva consulta desde Paleoware</h2><p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Idioma:</strong> ${locale}</p><hr /><p>${message}</p>`,
    }),
  })

  if (!emailResponse.ok) {
    console.error('Resend rejected the contact email', emailResponse.status)
    return false
  }

  return true
}

async function handleContact(
  request: Request,
  env: Env,
  origin: string | null,
): Promise<Response> {
  const contentLength = Number(request.headers.get('Content-Length') ?? 0)
  if (contentLength > MAX_BODY_BYTES) {
    return response({ ok: false, error: 'payload_too_large' }, 413, origin, env)
  }

  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY || !env.CONTACT_FROM_EMAIL) {
    return response({ ok: false, error: 'service_unconfigured' }, 503, origin, env)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return response({ ok: false, error: 'invalid_json' }, 400, origin, env)
  }

  if (!isRecord(body)) {
    return response({ ok: false, error: 'invalid_payload' }, 400, origin, env)
  }

  const payload: ContactPayload = {
    name: readString(body.name),
    email: readString(body.email),
    message: readString(body.message),
    privacy: body.privacy === true,
    website: readString(body.website),
    turnstileToken: readString(body.turnstileToken),
    locale: readString(body.locale),
  }

  if (payload.website) {
    return response({ ok: true }, 200, origin, env)
  }

  if (
    !payload.name ||
    payload.name.length > MAX_NAME_LENGTH ||
    !isValidEmail(payload.email) ||
    !payload.message ||
    payload.message.length > MAX_MESSAGE_LENGTH ||
    !payload.privacy ||
    !payload.turnstileToken
  ) {
    return response({ ok: false, error: 'invalid_payload' }, 400, origin, env)
  }

  if (!(await verifyTurnstile(payload.turnstileToken, request, env))) {
    return response({ ok: false, error: 'verification_failed' }, 400, origin, env)
  }

  try {
    if (!(await sendEmail(payload, env))) {
      return response({ ok: false, error: 'email_failed' }, 502, origin, env)
    }
  } catch (error) {
    console.error('Contact email request failed', error)
    return response({ ok: false, error: 'email_failed' }, 502, origin, env)
  }

  return response({ ok: true }, 200, origin, env)
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const origin = request.headers.get('Origin')

    if (!isAllowedOrigin(origin, env)) {
      return response({ ok: false, error: 'origin_not_allowed' }, 403, origin, env)
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...corsHeaders(origin, env), Vary: 'Origin' },
      })
    }

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      return handleContact(request, env, origin)
    }

    if (url.pathname === '/' && request.method === 'GET') {
      return response({ ok: true, service: 'paleoware-contact' }, 200, origin, env)
    }

    return response({ ok: false, error: 'not_found' }, 404, origin, env)
  },
}

export default worker
