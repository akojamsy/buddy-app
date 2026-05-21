import { CustomButton } from '@/components/fragments'
import { Input } from '#components/ui/input'
import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { AuthCard } from './auth-card'
import { AuthCardHeader } from '../../../components/fragments/auth-card-header'
import { AuthFooterLinks, AuthLoginPrompt } from './auth-footer-links'
import {
  EmailIcon,
  EyeIcon,
  EyeslashIcon,
  InfoIcon,
  LockIcon,
  UserOneIcon,
} from '@/assets/svg'

const signUpSchema = Yup.object({
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
  email: Yup.string()
    .trim()
    .email('Enter a valid work email')
    .required('Work email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
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

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)

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
        onSubmit={(values) => {
          // TODO: connect to registration API
          void { ...values, email: values.email.trim() }
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
            <div className='grid grid-cols-2 gap-5'>
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
              type='email'
              name='email'
              autoComplete='email'
              value={values.email}
              onChange={handleChange}
              onBlur={(e) => {
                handleBlur(e)
                void setFieldValue('email', e.target.value.trim())
              }}
              error={fieldError(touched.email, errors.email)}
              placeholder='Work email'
              className=''
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
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={fieldError(touched.password, errors.password)}
              placeholder='Password'
            />

            <CustomButton
              type='submit'
              className='mt-7.5'
              disabled={!isValid}
              loading={isSubmitting}
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
