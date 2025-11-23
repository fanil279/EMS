interface User {
    id: number;
    name: string;
    email: string;
    token: string;
    institutionName?: string;
    institutionAddress?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export interface LoginResponse {
    user: User;
    refresh: string;
}
