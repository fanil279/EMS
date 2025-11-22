import type { Institution } from './institution';

export interface User {
    id: number;
    email: string;
    name: string;
    role: 'admin' | 'user';
    institution: Institution | null;
    is_active: boolean;
    is_staff: boolean;
}
