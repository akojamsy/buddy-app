import { Link } from 'react-router-dom'

export function AuthFooterLinks() {
  return (
    <p className='text-start text-[13px] font-normal leading-[19px] tracking-[-0.0045em] text-[#84919A] p-2'>
      By clicking the button above, you agree to our{' '}
      <Link to='#' className='text-[#FF8600] hover:underline'>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link to='#' className='text-[#FF8600] hover:underline'>
        Privacy Policy
      </Link>
      .
    </p>
  )
}

export function AuthLoginPrompt() {
  return (
    <p className='text-start text-sm text-[#5B6871]'>
      Already have an account?{' '}
      <Link to='/login' className='font-medium text-[#FF8600] hover:underline'>
        Login
      </Link>
    </p>
  )
}
