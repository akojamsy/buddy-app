import { Link } from 'react-router-dom'
import { AuthLayout } from './components/auth-layout'
import { AuthCard } from './components/auth-card'

const SignIn = () => {
  return (
    <AuthLayout>
      <AuthCard>
        <h1 className='text-xl font-semibold tracking-tight text-[#3B3B45]'>
          Welcome back
        </h1>
        <p className='mt-2 text-sm text-[#6B6B76]'>
          Login page coming soon.{' '}
          <Link to='/' className='font-medium text-[#FF8600] hover:underline'>
            Back to sign up
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  )
}

export default SignIn
