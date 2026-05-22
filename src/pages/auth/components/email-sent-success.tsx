import { MailboxSentIcon } from '@/assets/svg'
import { CustomButton } from '@/components/fragments'
import { useNavigate } from 'react-router-dom'
import routesPath from '@/utils/routes-path'
import { AuthCard } from './auth-card'

type EmailSentSuccessProps = {
  email: string
  onResend?: () => void
}

export function EmailSentSuccess({ email, onResend }: EmailSentSuccessProps) {
  const navigate = useNavigate()

  return (
    <AuthCard className='flex flex-col items-center text-center'>
      <MailboxSentIcon
        className=' size-[7.313rem] text-[#84919A] '
        aria-hidden
      />

      <h1 className='text-2xl font-bold tracking-[-1.1%] text-[#1D1D18] leading-6'>
        Check your mailbox !
      </h1>

      <p className='mt-3 max-w-76.5 text-sm text-[#5B6871] leading-6 tracking-[-0.45%]'>
        We&apos;ve sent an email to {email} with an OTP to confirm your account.
        Check your inbox to activate your account.
      </p>

      <CustomButton
        type='button'
        className='mt-[21px] cursor-pointer w-fit lg:px-[2.156rem]'
        onClick={() => navigate(routesPath.VERIFY_EMAIL, { state: { email } })}
      >
        Confirm Email
      </CustomButton>

      <p className='mt-[38px] text-sm text-[#5B6871] leading-6 tracking-[-0.45%]'>
        Didn&apos;t get the mail?{' '}
        <button
          type='button'
          onClick={onResend}
          className='font-medium text-[#FF8600] hover:underline cursor-pointer ml-1'
        >
          Resend
        </button>
      </p>
    </AuthCard>
  )
}
