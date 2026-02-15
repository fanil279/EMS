import type { Institution } from './institution';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    institution: Institution | null;
    isActive: boolean;
    isStaff: boolean;
};
