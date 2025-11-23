import axios from "axios";
import { store } from "../store";

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

        const refresh = localStorage.getItem("refresh");
        
        if (!refresh) {
            console.error("No refresh token - logging out");
            localStorage.clear();
            store.dispatch({ type: "auth/logout" });
            return Promise.reject(err);
        }

        try {
            originalRequest._retry = true;
            
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/accounts/token/refresh/`,
                { refresh: refresh },
                { withCredentials: true }
            );
            
            localStorage.setItem("token", data.access);
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            store.dispatch({ type: "auth/logout" });
            return Promise.reject(refreshError);
        }
    }
);

export default axiosInstance;
