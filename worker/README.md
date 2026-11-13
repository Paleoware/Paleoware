# Paleoware Contact Worker

Worker de Cloudflare que protege y procesa el formulario de contacto.

## Configuración local

1. Copiar `worker/.dev.vars.example` como `worker/.dev.vars`.
2. Reemplazar `RESEND_API_KEY` por una clave real de Resend.
3. Dejar la clave de prueba de Turnstile para desarrollo local.
4. En `.env.local`, añadir:

```env
NEXT_PUBLIC_CONTACT_API_URL=http://localhost:8787/api/contact
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

Ejecutar en terminales separadas:

```bash
npm run worker:dev
npm run dev
```

El formulario estará disponible en `http://localhost:3000/es/` o `http://localhost:3000/en/`.

## Correo

El destinatario actual es `perranube312@gmail.com` y se puede cambiar en
`worker/wrangler.jsonc`, en `CONTACT_TO_EMAIL`.

`CONTACT_FROM_EMAIL` usa el remitente de prueba de Resend. Para producción hay
que sustituirlo por un remitente de un dominio verificado en Resend.

## Deploy

Antes de desplegar:

```bash
npx wrangler secret put RESEND_API_KEY --config worker/wrangler.jsonc
npx wrangler secret put TURNSTILE_SECRET_KEY --config worker/wrangler.jsonc
npm run worker:deploy
```

Después, definir `NEXT_PUBLIC_CONTACT_API_URL` con la URL pública del Worker.
