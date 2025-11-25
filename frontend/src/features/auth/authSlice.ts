import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, SigninResponse } from '../../types';

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        signIn: (state, action: PayloadAction<SigninResponse>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    },
});

export const { signIn, logout } = authSlice.actions;

export default authSlice.reducer;
