'use client'

import emailjs from '@emailjs/browser'
import { FormEvent, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

export function ContactForm() {
  const t = useTranslations('Contact')
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
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
      <label className="form-field">
        <span>{t('name')}</span>
        <input name="name" type="text" autoComplete="name" required />
      </label>
      <label className="form-field">
        <span>{t('email')}</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label className="form-field">
        <span>{t('phone')}</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label className="form-field form-field--wide">
        <span>{t('message')}</span>
        <textarea name="message" rows={5} required />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="form-consent form-field--wide">
        <input name="privacy" type="checkbox" required />
        <span>{t('privacy')}</span>
      </label>
      <div className="contact-form__bottom form-field--wide">
        <button className="button button--primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? t('sending') : t('submit')}
        </button>
        <p className="form-status" aria-live="polite">
          {status === 'success' ? t('success') : null}
          {status === 'error' ? t('error') : null}
          {status === 'unconfigured' ? t('fallback') : null}
        </p>
      </div>
    </form>
  )
}
