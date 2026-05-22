import { CustomButton, OtpInput, OTP_DIGIT_COUNT } from '@/components/fragments'
import { AuthCardHeader } from '@/components/fragments/auth-card-header'
import { setAuthUser } from '@/redux/features/auth/authSlice'
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from '@/redux/services/authApi'
import { useAppDispatch } from '@/redux/store'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '#hooks/use-local-storage'
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { EMAIL_VERIFIED_STORAGE_KEY } from '@/utils/helpers'
import routesPath from '@/utils/routes-path'
import { formatOtpValue } from '@/utils/helpers'
import { AuthLayout } from './components/auth-layout'
import { AuthCard } from './components/auth-card'
import { EmailVerifiedSuccess } from './components/email-verified-success'

type VerifyEmailLocationState = {
  email?: string
  otp?: string
}

type VerifyEmailStep = 'form' | 'success'

type PendingAuth = {
  user: Record<string, unknown>
  token: string
}

const getInitialStep = (): VerifyEmailStep =>
  getStorageItem(EMAIL_VERIFIED_STORAGE_KEY) ? 'success' : 'form'

const VerifyEmail = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const locationState = location.state as VerifyEmailLocationState | null
  const email = locationState?.email
  const [step, setStep] = useState<VerifyEmailStep>(getInitialStep)
  const [pendingAuth, setPendingAuth] = useState<PendingAuth | null>(null)
  const [code, setCode] = useState(() => formatOtpValue(locationState?.otp))
  const [verifyEmail, { isLoading: isSubmitting }] = useVerifyEmailMutation()
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation()

  const isComplete = code.length === OTP_DIGIT_COUNT

  const handleResend = async () => {
    if (!email) return
    const result = await resendOtp(email).unwrap()
    if (result.success === true) {
      toast.success(result.message)
      setCode(formatOtpValue(result.data.otp))
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isComplete || !email) return

    const result = await verifyEmail({ email, otp: code }).unwrap()
    if (result.success === true) {
      if (result.data?.user && result.data?.token) {
        setPendingAuth({ user: result.data.user, token: result.data.token })
      }
      setStorageItem(EMAIL_VERIFIED_STORAGE_KEY, true)
      setStep('success')
    }
  }

  if (!email && step !== 'success') {
    return <Navigate to={routesPath.SIGNUP} replace />
  }

  if (step === 'success') {
    return (
      <AuthLayout>
        <EmailVerifiedSuccess
          onContinue={() => {
            removeStorageItem(EMAIL_VERIFIED_STORAGE_KEY)
            if (pendingAuth) {
              dispatch(setAuthUser(pendingAuth))
            }
          }}
        />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthCardHeader
          title='Verify your email'
          description={`A four digit OTP code has been sent to your email`}
          className='gap-2 mb-0'
          descriptionClassName='text-[13px]'
        />

        <p className='text-[13px] font-normal text-[#FF8600] tracking-[-0.45%] leading-5'>
          {email}
        </p>

        <form onSubmit={handleSubmit} className='mt-7 flex flex-col'>
          <OtpInput value={code} onChange={setCode} />

          <CustomButton
            type='submit'
            className='mt-8.5 w-fit cursor-pointer lg:px-[2.156rem]'
            disabled={!isComplete}
            loading={isSubmitting}
            loadingText='Confirming...'
          >
            Confirm code
          </CustomButton>
        </form>

        <p className='mt-[38px] text-sm text-[#5B6871] leading-6 tracking-[-0.45%]'>
          Didn&apos;t get the mail?{' '}
          <button
            type='button'
            onClick={handleResend}
            disabled={isResending}
            className='font-medium text-[#FF8600] hover:underline cursor-pointer ml-1 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isResending ? 'Sending…' : 'Resend'}
          </button>
        </p>
      </AuthCard>
    </AuthLayout>
  )
}

export default VerifyEmail
