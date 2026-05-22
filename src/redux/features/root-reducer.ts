import { combineReducers } from '@reduxjs/toolkit'

import { baseApi } from '../services/baseApi'
import { authSliceReducer } from './auth/authSlice'
import { messagesSliceReducer } from './messages/messagesSlice'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSliceReducer,
  messages: messagesSliceReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
