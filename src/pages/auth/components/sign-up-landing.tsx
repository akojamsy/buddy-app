import { AuthCard } from './auth-card'
import { AuthFooterLinks, AuthLoginPrompt } from './auth-footer-links'
import { EmailIcon, GoogleIcon } from '@/assets/svg'

type SignUpLandingProps = {
  onEmailSignUp: () => void
}

export function SignUpLanding({ onEmailSignUp }: SignUpLandingProps) {
  return (
    <AuthCard>
      <h1 className='text-lg md:text-2xl font-bold tracking-tight text-[#3B3B45]'>
        Register your account
      </h1>

      <div className='my-[2.063rem] flex flex-col gap-'>
        <button
          type='button'
          onClick={onEmailSignUp}
          className='flex h-10 w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#E4E4E9] bg-white text-sm font-medium text-[#5B6871] transition-colors hover:bg-[#FAFAFA] cursor-pointer'
        >
          <EmailIcon className='size-5.5 text-[#1D1D18]' />
          Sign up with email
        </button>

        <div className='relative flex items-center py-[12px] leading-[19px]'>
          <div className='h-px flex-1 bg-[#E4E4E9]' />
          <span className='px-3 text-[13px] text-[#5B6871]'>or</span>
          <div className='h-px flex-1 bg-[#E4E4E9]' />
        </div>

        <button
          type='button'
          className='flex h-10 w-full items-center justify-center gap-2.5 rounded-[6px] border border-[#E4E4E9] bg-white text-sm font-medium text-[#5B6871] transition-colors hover:bg-[#FAFAFA] cursor-pointer'
        >
          <GoogleIcon className='size-5' />
          Sign up with Google
        </button>
      </div>

      <div className=' space-y-[68px]'>
        <AuthFooterLinks />
        <AuthLoginPrompt />
      </div>
    </AuthCard>
  )
}
