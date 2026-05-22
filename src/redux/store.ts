import { configureStore } from "@reduxjs/toolkit";
import type { Middleware } from "redux";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist";
import localStorage from "redux-persist/es/storage";
import { baseApi } from "./services/baseApi";
import rootReducer from "./features/root-reducer";

const persistConfig = {
    key: "root",
    storage: localStorage,
    whitelist: ["auth", "messages"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            immutableCheck: false,
        }).concat(baseApi.middleware as Middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootStateType = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);