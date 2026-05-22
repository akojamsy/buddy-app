import { OTP_DIGIT_COUNT } from '@/components/fragments'

export function formatOtpValue(
  otp: number | string | undefined | null,
): string {
  if (otp == null || otp === '') return ''
  const digits = String(otp).replace(/\D/g, '')
  return digits.slice(0, OTP_DIGIT_COUNT)
}
