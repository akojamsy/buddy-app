import { MailboxIcon } from '@/assets/svg'
import { CustomButton } from '@/components/fragments'
import { useNavigate } from 'react-router-dom'
import routesPath from '@/utils/routes-path'
import { AuthCard } from './auth-card'

type EmailVerifiedSuccessProps = {
  onContinue?: () => void
}

export function EmailVerifiedSuccess({ onContinue }: EmailVerifiedSuccessProps) {
  const navigate = useNavigate()

  return (
    <AuthCard className='flex flex-col items-center text-center py-[80px]'>
      <div className='relative  text-[#84919A]'>
        <MailboxIcon className='size-18 md:w-19 md:h-[3.088rem]' aria-hidden />
      </div>

      <h1 className='text-2xl font-bold tracking-[-1.1%] text-[#1D1D18] leading-6 mt-9 mb-3'>
        Email verified !
      </h1>

      <p className='max-w-79.5 text-[13px] text-[#5B6871] leading-[19px] tracking-[-0.45%]'>
        The verified email address will be associated with your account. Click
        on the button below to continue
      </p>

      <CustomButton
        type='button'
        className='mt-7 cursor-pointer w-fit lg:px-[2.156rem]'
        onClick={() => {
          onContinue?.()
          navigate(routesPath.DASHBOARD)
        }}
      >
        Continue
      </CustomButton>
    </AuthCard>
  )
}
