import { clearStorageItem } from '#hooks/use-local-storage'
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { reset } from '../features/auth/authSlice'
import { toast } from 'sonner'

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_PUBLIC_URL
  const hasEnvUrl = typeof envUrl === 'string' && envUrl.trim() !== ''
  if (hasEnvUrl) return envUrl.replace(/\/$/, '')
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    if (host === 'localhost' || host === '127.0.0.1') return ''
  }
  if (import.meta.env.DEV) return ''
  return ''
}

export const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState, endpoint }) => {
    // Try cookie first, then Redux state (persisted auth)
    let accessToken: string = Cookies.get('token') || ''
    if (!accessToken) {
      const state = getState() as { auth?: { token?: string } }
      accessToken = state?.auth?.token || ''
    }
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    } else {
      if (import.meta.env.DEV) {
        console.warn(
          'No authentication token found (cookie or Redux) for endpoint:',
          endpoint,
        )
      }
    }
    headers.set('accept', 'application/json')
    return headers
  },
})

export const baseQueryInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  // console.log(result)

  // const searchParams = useSearchParams();
  // const redirect_url = searchParams.get("redirect");

  if (result?.error) {
    const res: FetchBaseQueryError = result.error
    const originalStatus = (result.error as { originalStatus?: number })
      .originalStatus
    const isParsingError =
      (result.error as { status?: string }).status === 'PARSING_ERROR'

    // 405 Method Not Allowed or HTML response (e.g. nginx error page)
    if (res.status === 405 || originalStatus === 405 || isParsingError) {
      const message =
        originalStatus === 405 || res.status === 405
          ? 'Method not allowed. The server may not accept this request. If you use a proxy, check that the API base URL is correct.'
          : 'Server returned an invalid response. The API may be at a different URL or the server is misconfigured.'
      toast.error(
        originalStatus === 405 || res.status === 405
          ? '405 Not Allowed'
          : 'Request failed',
        {
          description: message,
        },
      )
    }
    if (res.status === 403) {
      const errorData = res?.data as {
        message?: string
        error?: { message?: string }
      }
      if (errorData?.message) {
        toast.error('Forbidden', {
          description: errorData.message,
        })
      }
      if (errorData?.error?.message) {
        toast.error('Forbidden', {
          description: errorData.error.message,
        })
      }
    }
    if (res?.status === 401) {
      const errorData = res?.data as {
        status?: string
        message?: string
        error?: { message?: string }
      }

      // Show error message from backend
      const errorMessage = errorData?.message || errorData?.error?.message
      if (errorMessage) {
        toast.error('Authentication Failed', {
          description: errorMessage,
        })
      } else if (errorData?.status === 'failed') {
        toast.error('Authentication Failed', {
          description: 'Invalid credentials. Please try again.',
        })
      }

      // Only redirect if we're not already on login page
      if (errorData?.status === 'failed' && typeof window !== 'undefined') {
        const currentPath = window.location.pathname
        if (currentPath !== '/' && currentPath !== '/login') {
          api.dispatch(reset())
          Cookies.remove('token')
          clearStorageItem()
          const params = new URLSearchParams(window.location.search)
          const redirect = params.get('redirect')
          const loginUrl = `/login?redirect=${encodeURIComponent(
            redirect || '',
          )}`
          window.location.href = loginUrl
        }
      }
    }
    if (res.status === 404) {
      const errorData = res?.data as {
        message?: string
        error?: { message?: string }
      }
      const message = errorData?.error?.message || errorData?.message
      if (message) {
        toast.error('Not Found', {
          description: message,
        })
      }
    }
    if (res.status === 422) {
      const errorData = res?.data as { message: string; status: number }

      toast.error('Validation Error', {
        description:
          errorData?.message ||
          'One or more fields have validation errors. Please check your input.',
      })
    }

    if (res.status === 409) {
      const errorData = res?.data as { message?: string }
      const message = errorData?.message
      if (message) {
        toast.error('Conflict', {
          description: message,
        })
      }
    }

    if (res.status === 503) {
      const errorData = res?.data as {
        message?: string
        error?: { message?: string }
      }
      const message = errorData?.message || errorData?.error?.message
      if (message) {
        toast.error('Service Unavailable', {
          description: message,
        })
      }
    }

    if (res.status === 500) {
      const errorData = res?.data as {
        message?: string
        error?: { message?: string }
      }
      const message =
        errorData?.message ||
        errorData?.error?.message ||
        'Something went wrong on our end. Please try again.'
      console.error('Server Error', {
        description: message,
      })
    }

    if (res.status === 400) {
      const errorData = res?.data as {
        message?: string | object
        error?: { message?: { error?: string } }
      }
      let message = errorData?.message
      console.log(res)
      if (typeof message === 'object') {
        message = errorData?.error?.message?.error || JSON.stringify(message)
      }
      if (message) {
        toast.error('Bad Request', {
          description: message,
        })
      }
    }
  }

  return result
}

export const TAG_TYPES = []

export const baseApi = createApi({
  baseQuery: baseQueryInterceptor,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: TAG_TYPES,
})
