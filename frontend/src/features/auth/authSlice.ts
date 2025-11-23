import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, SigninResponse } from '../../types';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        login: (state, action: PayloadAction<SigninResponse>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
