import axiosInstance from '../config/axios';
import type {
    SigninResponse,
    RegisterPayload,
    SigninPayload,
} from '../types';

class AuthService {
    async register(payload: RegisterPayload): Promise<SigninResponse | null> {
        try {
            const response = await axiosInstance.post('accounts/register/', payload);

            return response.data;
        } catch (err) {
            console.error('Error registering a user:', err);
            
            throw err;
        }
    }

    async signIn(payload: SigninPayload): Promise<SigninResponse | null> {
        try {
            const response = await axiosInstance.post('accounts/login/', payload);
            
            return response.data;
        } catch (err) {
            console.error('Error logging in a user:', err);

            throw err;
        }
    }

    async logout(): Promise<boolean> {
        try {
            await axiosInstance.post('accounts/logout/');

            return true;
        } catch (err: any) {
            if (err.response?.status === 401) return true;

            console.error('Error logging out the user:', err);

            throw err;
        }
    }
}

export default new AuthService();
