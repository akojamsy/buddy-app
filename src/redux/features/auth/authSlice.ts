
import type { RootStateType } from '../../store';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthUserPayload {
    user: Record<string, unknown>;
    token?: string;
}

interface AuthState {
    token: string;
    user: Record<string, unknown>;
}

const initialState: AuthState = {
    token: "",
    user: {},
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        setAuthUser: (state, action: PayloadAction<AuthUserPayload>) => {
            state.user = action.payload.user;
            if (action.payload.token) {
                state.token = action.payload.token;
            }
        },
    },
});

export const {
    reset,
    setAuthUser,
} = authSlice.actions;

export const authSliceReducer = authSlice.reducer;

export const selectUser = (state: RootStateType) => state.auth.user;

const getPermissionName = (permission: unknown): string | null => {
    if (typeof permission === "string") return permission;
    if (!permission || typeof permission !== "object") return null;

    const permissionRecord = permission as Record<string, unknown>;
    const name = permissionRecord.name;

    return typeof name === "string" ? name : null;
};

const isUnknownArray = (value: unknown): value is unknown[] => Array.isArray(value);

const getRawPermissions = (user: Record<string, unknown>): unknown[] => {
    if (!isUnknownArray(user.roles) || user.roles.length === 0) {
        return [];
    }

    const firstRole = user.roles[0];
    if (!firstRole || typeof firstRole !== "object") {
        return [];
    }

    const roleRecord = firstRole as Record<string, unknown>;
    const rolePermissions: unknown = roleRecord["permissions"];

    return isUnknownArray(rolePermissions) ? rolePermissions : [];
};

export const selectPermissions = (state: RootStateType) => {
    const permissions = getRawPermissions(state.auth.user);

    return Array.isArray(permissions)
        ? permissions
            .map(getPermissionName)
            .filter((permission): permission is string => Boolean(permission))
        : [];
};