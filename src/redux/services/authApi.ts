import { baseApi } from './baseApi'

interface SigninRequest {
  email: string
  password: string
}

interface SigninResponse {
  data: {
    access_token: string
    user: Record<string, unknown>
  }
}

interface SignupRequest {
  first_name: string
  last_name: string
  email: string
  password: string
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
          console.log(data)
        } catch (error: unknown) {
          console.error('Login failed:', error)
          // Error handling is done by baseQueryInterceptor
        }
      },
    }),
    signup: builder.mutation<void, SignupRequest>({
      query: (credentials) => ({
        url: `/admin/register`,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
        } catch (error: unknown) {
          console.error('Signup failed:', error)
          // Error handling is done by baseQueryInterceptor
        }
      },
    }),
  }),
})

export const { useSigninMutation, useSignupMutation } = authApi
