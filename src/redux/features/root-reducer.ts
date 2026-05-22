import { combineReducers } from "@reduxjs/toolkit";

import { baseApi } from '../services/baseApi';
import { authSliceReducer } from './auth/authSlice';

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;