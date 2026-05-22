import { useState } from 'react'
import { AuthLayout } from './components/auth-layout'
import { EmailSentSuccess } from './components/email-sent-success'
import { SignUpForm } from './components/sign-up-form'
import { SignUpLanding } from './components/sign-up-landing'

type SignUpStep = 'landing' | 'form' | 'success'

const SignUp = () => {
  const [step, setStep] = useState<SignUpStep>('landing')
  const [email, setEmail] = useState('')

  return (
    <AuthLayout>
      {step === 'landing' ? (
        <SignUpLanding onEmailSignUp={() => setStep('form')} />
      ) : null}
      {step === 'form' ? (
        <SignUpForm
          onSuccess={(submittedEmail) => {
            setEmail(submittedEmail)
            setStep('success')
          }}
        />
      ) : null}
      {step === 'success' ? <EmailSentSuccess email={email} /> : null}
    </AuthLayout>
  )
}

export default SignUp
