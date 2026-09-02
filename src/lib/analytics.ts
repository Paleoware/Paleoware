import { sendGAEvent } from '@next/third-parties/google'

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (params) {
    sendGAEvent('event', name, params)
  } else {
    sendGAEvent('event', name)
  }
}
