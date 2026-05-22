import { setAuthUser } from '../features/auth/authSlice'
import { baseApi } from './baseApi'

interface SigninRequest {
  email: string
  password: string
}

interface SigninResponse {
  success: boolean
  message: string
  data: {
    user: Record<string, unknown>
    token: string
  }
}

interface SignupRequest {
  first_name: string
  last_name: string
  email: string
  password: string
}

interface SignupResponse {
  success: boolean
  message: string
  data: {
    token?: string
    otp: number | string
  }
}

interface VerifyEmailRequest {
  email: string
  otp: string
}

interface ResendOtpResponse {
  success: boolean
  message: string
  data: {
    otp: number | string
  }
}

interface VerifyEmailResponse {
  success: boolean
  message: string
  data: {
    user: Record<string, unknown>
    token: string
  }
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (credentials) => ({
        url: `/admin/login`,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.success && data.data?.user && data.data?.token) {
            dispatch(
              setAuthUser({
                user: data.data.user,
                token: data.data.token,
              }),
            )
          }
        } catch {
          // Error handling is done by baseQueryInterceptor
        }
      },
    }),
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: `/admin/register`,
        method: 'POST',
        body: credentials,
      }),
    }),

    resendOtp: builder.mutation<ResendOtpResponse, string>({
      query: (email) => ({
        url: `/admin/resend-otp`,
        method: 'POST',
        body: { email: email },
      }),
    }),

    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (credentials) => ({
        url: `/admin/verify-otp`,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.success && data.data?.user && data.data?.token) {
            dispatch(
              setAuthUser({
                user: data.data.user,
                token: data.data.token,
              }),
            )
          }
        } catch {
          // Error handling is done by baseQueryInterceptor
        }
      },
    }),
  }),
})

export const {
  useSigninMutation,
  useSignupMutation,
  useResendOtpMutation,
  useVerifyEmailMutation,
} = authApi
