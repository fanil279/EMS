import axiosInstance from "../config/axios";
import type { SigninResponse, RegisterPayload, SigninPayload } from '../types';

class AuthService {
    readonly backendUrl: string;

    constructor() {
        this.backendUrl = import.meta.env.VITE_BACKEND_URL;
    }

    async register(payload: RegisterPayload): Promise<SigninResponse | null> {
        try {
            const response = await axiosInstance.post("accounts/register/", payload);

            return response.data;
        } catch (err) {
            console.error("Error registering a user:", err);
            throw err;
        }
    }

    async signIn(payload: SigninPayload): Promise<SigninResponse | null> {
        try {
            const response = await axiosInstance.post("accounts/login/", payload);
            
            return response.data;
        } catch (err) {
            console.error("Error logging in a user:", err);
            throw err;
        }
    }

    async logout(): Promise<void> {
        try {
            
        } catch (err) {
            console.error("Error logging out the user:", err);
            throw err;
        }
    }

    async verifyAuth(): Promise<SigninResponse | null> {
        try {
            const response = await axiosInstance.get("accounts/verify/");
            return { user: response.data.user, refresh: '' };
        } catch (err) {
            console.error("Auth verification failed:", err);
            return null;
        }
    }
}

export default new AuthService();
