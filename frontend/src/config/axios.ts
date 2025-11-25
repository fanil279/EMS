import axios from 'axios';
import { store } from '../store';
import { logout } from '../features/auth/authSlice';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },

    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


axiosInstance.interceptors.response.use(
    (response) => response,
    
    (err) => {
        if (err.response?.status !== 401) return Promise.reject(err);

        store.dispatch(logout());
        
        return Promise.reject(err);
    }
);

export default axiosInstance;
