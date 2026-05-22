import type { RootState, RootStateType } from '../../store'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthUserPayload {
  user: Record<string, unknown>
  token?: string
}

interface AuthState {
  token: string
  user: Record<string, unknown>
}

const initialState: AuthState = {
  token: '',
  user: {},
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    setAuthUser: (state, action: PayloadAction<AuthUserPayload>) => {
      state.user = action.payload.user
      if (action.payload.token) {
        state.token = action.payload.token
      }
    },
  },
})

export const { reset, setAuthUser } = authSlice.actions

export const authSliceReducer = authSlice.reducer

export const selectUser = (state: RootStateType) => state.auth.user

export const selectAuthToken = (state: RootState) => state.auth?.token ?? ''

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth?.token)

const getString = (value: unknown): string =>
  typeof value === 'string' ? value : ''

export const selectNavUserName = (state: RootState) => {
  const user = state.auth?.user ?? {}
  const firstName = getString(user.first_name)
  const lastName = getString(user.last_name)

  return (
    [firstName, lastName].filter(Boolean).join(' ') ||
    getString(user.email) ||
    'User'
  )
}
