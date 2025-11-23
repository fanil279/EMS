import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginResponse } from '../../types';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        login: (state, action: PayloadAction<LoginResponse>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.user.token);
            localStorage.setItem("refresh", action.payload.refresh);
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("refresh");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
