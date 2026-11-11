'use client'

import emailjs from '@emailjs/browser'
import { FormEvent, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { trackEvent } from '@/lib/analytics'

type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

export function ContactForm() {
  const t = useTranslations('Contact.form')
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')

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

    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

    if (!publicKey || !serviceId || !templateId) {
      setStatus('unconfigured')
      return
    }

    setStatus('sending')

    try {
      emailjs.init({ publicKey })
      await emailjs.sendForm(serviceId, templateId, form)
      form.reset()
      setStatus('success')
      trackEvent('form_submit')
    } catch {
      setStatus('error')
      trackEvent('form_submit_error')
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
            {status === 'error' ? t('error') : null}
            {status === 'unconfigured' ? t('unconfigured') : null}
          </p>
        </div>
      </div>
    </form>
  )
}
