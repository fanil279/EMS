interface User {
    id: number;
    name: string;
    email: string;
    institutionName?: string;
    institutionAddress?: string;
    token: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export interface SigninResponse {
    user: User;
    refresh: string;
}

export interface AuthModalProps {
    onClose: () => void;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    institution_name?: string;
    institution_address?: string;
}

export interface SigninPayload {
    email: string;
    password: string;
}
