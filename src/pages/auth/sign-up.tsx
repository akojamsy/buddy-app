import { useState } from 'react'
import { AuthLayout } from './components/auth-layout'
import { SignUpForm } from './components/sign-up-form'
import { SignUpLanding } from './components/sign-up-landing'

type SignUpStep = 'landing' | 'form'

const SignUp = () => {
  const [step, setStep] = useState<SignUpStep>('landing')

  return (
    <AuthLayout>
      {step === 'landing' ? (
        <SignUpLanding onEmailSignUp={() => setStep('form')} />
      ) : (
        <SignUpForm />
      )}
    </AuthLayout>
  )
}

export default SignUp
