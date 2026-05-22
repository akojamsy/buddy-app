import { CustomButton, OtpInput, OTP_DIGIT_COUNT } from '@/components/fragments'
import { AuthCardHeader } from '@/components/fragments/auth-card-header'
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import routesPath from '@/utils/routes-path'
import { AuthLayout } from './components/auth-layout'
import { AuthCard } from './components/auth-card'
import { EmailVerifiedSuccess } from './components/email-verified-success'

type VerifyEmailLocationState = {
  email?: string
}

type VerifyEmailStep = 'form' | 'success'

const VerifyEmail = () => {
  const location = useLocation()
  const email = (location.state as VerifyEmailLocationState | null)?.email
  const [step, setStep] = useState<VerifyEmailStep>('form')
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isComplete = code.length === OTP_DIGIT_COUNT

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!isComplete || !email) return

    setIsSubmitting(true)
    try {
      // TODO: connect to OTP verification API
      await Promise.resolve({ email, code })
      setStep('success')
    } finally {
      setIsSubmitting(false)
    }
  }

  // TODO: Add a toaster for when there is no email in the location state

  if (!email) {
    return <Navigate to={routesPath.SIGNUP} replace />
  }

  if (step === 'success') {
    return (
      <AuthLayout>
        <EmailVerifiedSuccess />
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
            className='font-medium text-[#FF8600] hover:underline cursor-pointer ml-1'
          >
            Resend
          </button>
        </p>
      </AuthCard>
    </AuthLayout>
  )
}

export default VerifyEmail
