import { CustomButton } from '@/components/fragments'
import { Input } from '#components/ui/input'
import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { AuthCard } from './auth-card'
import { AuthCardHeader } from '../../../components/fragments/auth-card-header'
import { AuthFooterLinks, AuthLoginPrompt } from './auth-footer-links'
import {
  CheckIcon,
  EmailIcon,
  EyeIcon,
  EyeslashIcon,
  InfoIcon,
  LockIcon,
  UserOneIcon,
} from '@/assets/svg'
import { useSignupMutation } from '@/redux/services/authApi'

const EMAIL_MAX_LENGTH = 60
const PASSWORD_MAX_LENGTH = 15

const signUpSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string()
    .trim()
    .email('Enter a valid work email')
    .max(
      EMAIL_MAX_LENGTH,
      `Email must be at most ${EMAIL_MAX_LENGTH} characters`,
    )
    .required('Work email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(
      PASSWORD_MAX_LENGTH,
      `Password must be at most ${PASSWORD_MAX_LENGTH} characters`,
    )
    .required('Password is required'),
})

type SignUpValues = Yup.InferType<typeof signUpSchema>

const initialValues: SignUpValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

function fieldError(
  touched: boolean | undefined,
  error: string | undefined,
): string | undefined {
  return touched && error ? error : undefined
}

type SignUpFormProps = {
  onSuccess: (email: string) => void
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const [signup, { isLoading }] = useSignupMutation()

  const handleSubmit = (
    values: SignUpValues,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    signup({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    })
      .unwrap()
      .then((res) => {
        onSuccess(values.email)
        setSubmitting(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <AuthCard>
      <AuthCardHeader
        title='Register your account'
        description='Proceed to create account and setup your organization'
      />

      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        validateOnMount
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isValid,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-3'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-3 sm:gap-5'>
              <Input
                floatingLabel
                label='First Name'
                leftIcon={{ icon: UserOneIcon, className: 'size-5' }}
                type='text'
                name='firstName'
                autoComplete='given-name'
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={fieldError(touched.firstName, errors.firstName)}
                placeholder='First Name'
              />

              <Input
                floatingLabel
                label='Last Name'
                leftIcon={{ icon: UserOneIcon, className: 'size-5' }}
                type='text'
                name='lastName'
                autoComplete='family-name'
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={fieldError(touched.lastName, errors.lastName)}
                placeholder='Last Name'
              />
            </div>

            <Input
              floatingLabel
              label='Email'
              leftIcon={{ icon: EmailIcon, className: 'size-6' }}
              labelIcon={{ icon: InfoIcon, className: 'size-5' }}
              rightIcon={
                values.email && !errors.email
                  ? {
                      icon: CheckIcon,
                      className: 'size-5 text-[#119C2B]',
                      ariaLabel: 'Valid email',
                    }
                  : undefined
              }
              type='email'
              name='email'
              autoComplete='email'
              maxLength={EMAIL_MAX_LENGTH}
              value={values.email}
              onChange={(e) => {
                void setFieldValue(
                  'email',
                  e.target.value.replace(/\s/g, '').slice(0, EMAIL_MAX_LENGTH),
                )
              }}
              onBlur={handleBlur}
              error={fieldError(touched.email, errors.email)}
              characterCount={{
                current: values.email.length,
                max: EMAIL_MAX_LENGTH,
              }}
              placeholder='Work email'
            />

            <Input
              floatingLabel
              label='Password'
              leftIcon={{ icon: LockIcon, className: 'size-5' }}
              rightIcon={{
                icon: showPassword ? EyeIcon : EyeslashIcon,
                className: 'size-5',
                onClick: () => setShowPassword((visible) => !visible),
                ariaLabel: showPassword ? 'Hide password' : 'Show password',
              }}
              type={showPassword ? 'text' : 'password'}
              name='password'
              autoComplete='new-password'
              maxLength={PASSWORD_MAX_LENGTH}
              value={values.password}
              onChange={(e) => {
                void setFieldValue(
                  'password',
                  e.target.value.slice(0, PASSWORD_MAX_LENGTH),
                )
              }}
              onBlur={handleBlur}
              error={fieldError(touched.password, errors.password)}
              characterCount={{
                current: values.password.length,
                max: PASSWORD_MAX_LENGTH,
              }}
              placeholder='Password'
            />

            <CustomButton
              type='submit'
              className='mt-7.5 cursor-pointer'
              disabled={!isValid}
              loading={isLoading}
              loadingText='Creating account...'
            >
              Create account
            </CustomButton>
          </form>
        )}
      </Formik>

      <div className='mt-7.5 space-y-[68px]'>
        <AuthFooterLinks />
        <AuthLoginPrompt />
      </div>
    </AuthCard>
  )
}
