'use client'

import { FormEvent, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { trackEvent } from '@/lib/analytics'

type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

declare global {
  interface Window {
    turnstile?: {
      reset: () => void
    }
  }
}

export function ContactForm() {
  const t = useTranslations('Contact.form')
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [verificationRequired, setVerificationRequired] = useState(false)

  const resetTurnstile = () => {
    window.turnstile?.reset()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = formRef.current

    if (!form) {
      return
    }

    const formData = new FormData(form)
    if (formData.get('website')) {
      return
    }

    const contactApiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

    if (!contactApiUrl || !turnstileSiteKey) {
      setStatus('unconfigured')
      return
    }

    const turnstileToken = formData.get('cf-turnstile-response')
    if (typeof turnstileToken !== 'string' || !turnstileToken) {
      setVerificationRequired(true)
      setStatus('error')
      return
    }

    setVerificationRequired(false)
    setStatus('sending')

    try {
      const response = await fetch(contactApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          privacy: formData.get('privacy') === 'on',
          website: formData.get('website'),
          turnstileToken,
          locale: document.documentElement.lang,
        }),
      })

      if (!response.ok) {
        throw new Error('Contact request failed')
      }

      form.reset()
      resetTurnstile()
      setVerificationRequired(false)
      setStatus('success')
      const locale = document.documentElement.lang || 'unknown'
      trackEvent('form_submit', { form: 'contact', locale })
      trackEvent('generate_lead', { method: 'contact_form', locale })
    } catch {
      resetTurnstile()
      setStatus('error')
      trackEvent('form_submit_error', { form: 'contact', locale: document.documentElement.lang || 'unknown' })
    }
  }

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
      <div className="contact-form__body">
        <div className="form-row">
          <label className="field">
            <span>{t('name')}</span>
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label className="field">
            <span>{t('email')}</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
        </div>

        <label className="field">
          <span>{t('message')}</span>
          <textarea
            name="message"
            rows={4}
            placeholder={t('messagePlaceholder')}
            required
          />
        </label>

        <label className="honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <label className="consent">
          <input name="privacy" type="checkbox" required />
          <span>{t('privacy')}</span>
        </label>

        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? (
          <div
            className="cf-turnstile contact-form__turnstile"
            data-action="contact"
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          />
        ) : null}

        <div className="form-actions">
          <button
            className="btn btn--primary contact-form__submit"
            type="submit"
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
            data-status={status}
          >
            <span className="contact-form__submit-label">
              {status === 'sending'
                ? t('sending')
                : status === 'success'
                  ? t('submitted')
                  : t('submit')}
            </span>
            <span className="contact-form__submit-arrow" aria-hidden="true">→</span>
            <span className="contact-form__progress" aria-hidden="true" />
          </button>
          <p className="form-status" role="status" aria-live="polite">
            {status === 'success' ? t('success') : null}
            {status === 'error'
              ? verificationRequired
                ? t('verification')
                : t('error')
              : null}
            {status === 'unconfigured' ? t('unconfigured') : null}
          </p>
        </div>
      </div>
    </form>
  )
}
