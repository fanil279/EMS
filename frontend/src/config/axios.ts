import axios from "axios";
import authService from "../services/authService";
import { store } from "../store";
import { logout } from "../features/auth/authSlice";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },

    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    
    async (err) => {
        const originalRequest = err.config;
        
        if (err.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(err);
        }

        if (originalRequest.url.includes("logout")) {
            return Promise.reject(err);
        }

        try {
            originalRequest._retry = true;
            
            await authService.verifyAuth();
            
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            store.dispatch(logout());
            return Promise.reject(refreshError);
        }
    }
);

export default axiosInstance;
