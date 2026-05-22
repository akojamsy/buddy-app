import { CustomButton } from '@/components/fragments'
import { AuthCardHeader } from '@/components/fragments/auth-card-header'
import { Input } from '#components/ui/input'
import { EmailIcon, EyeIcon, EyeslashIcon, LockIcon } from '@/assets/svg'
import { useSigninMutation } from '@/redux/services/authApi'
import routesPath from '@/utils/routes-path'
import { Formik, type FormikHelpers } from 'formik'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { AuthCard } from './components/auth-card'
import { AuthFooterLinks } from './components/auth-footer-links'
import { AuthLayout } from './components/auth-layout'

const EMAIL_MAX_LENGTH = 60
const PASSWORD_MAX_LENGTH = 15

const signInSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Enter a valid email')
    .max(
      EMAIL_MAX_LENGTH,
      `Email must be at most ${EMAIL_MAX_LENGTH} characters`,
    )
    .required('Email is required'),
  password: Yup.string()
    .max(
      PASSWORD_MAX_LENGTH,
      `Password must be at most ${PASSWORD_MAX_LENGTH} characters`,
    )
    .required('Password is required'),
})

type SignInValues = Yup.InferType<typeof signInSchema>

const initialValues: SignInValues = {
  email: '',
  password: '',
}

function fieldError(
  touched: boolean | undefined,
  error: string | undefined,
): string | undefined {
  return touched && error ? error : undefined
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [signin] = useSigninMutation()

  const submitHandler = async (values: SignInValues) => {
    const result = await signin({
      email: values.email,
      password: values.password,
    }).unwrap()
    if (result.success === true) {
      navigate(routesPath.DASHBOARD)
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthCardHeader
          title='Log in to your account'
          description='Proceed to create account and setup your organization'
        />

        <Formik<SignInValues>
          initialValues={initialValues}
          validationSchema={signInSchema}
          validateOnMount
          onSubmit={submitHandler}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isValid,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-3'>
              <Input
                floatingLabel
                label='Email'
                leftIcon={{ icon: EmailIcon, className: 'size-6' }}
                type='email'
                name='email'
                autoComplete='email'
                maxLength={EMAIL_MAX_LENGTH}
                value={values.email}
                onChange={(e) => {
                  void setFieldValue(
                    'email',
                    e.target.value
                      .replace(/\s/g, '')
                      .slice(0, EMAIL_MAX_LENGTH),
                  )
                }}
                onBlur={handleBlur}
                error={fieldError(touched.email, errors.email)}
                characterCount={{
                  current: values.email.length,
                  max: EMAIL_MAX_LENGTH,
                }}
                placeholder='Email'
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
                autoComplete='current-password'
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
                loading={isSubmitting}
                loadingText='Logging in...'
              >
                Login
              </CustomButton>
            </form>
          )}
        </Formik>

        <div className='mt-7.5 space-y-[68px]'>
          <AuthFooterLinks />
          <p className='text-start text-sm text-[#5B6871]'>
            Don&apos;t have an account?{' '}
            <Link
              to={routesPath.SIGNUP}
              className='font-medium text-[#FF8600] hover:underline'
            >
              Register
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}

export default SignIn
