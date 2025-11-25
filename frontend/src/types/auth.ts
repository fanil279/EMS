interface User {
    id: number;
    name: string;
    email: string;
    institutionName?: string;
    institutionAddress?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

export interface SigninResponse {
    user: User;
    token: string;
    refresh: string;
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
