import type { User } from './user';

export interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
    organiser: User;
    created_at: string;
}

export interface createEventPayload {
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
}
