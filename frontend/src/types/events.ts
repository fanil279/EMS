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

export interface EventRegistrationState {
    registrations: { [eventId: number]: EventRegistration };
}

export interface EventPayload {
    title: string;
    description: string;
    location: string;
    start_date: string;
    end_date: string;
    registration_deadline: string;
}

export interface EventRegistrationPayload {
    event_id: number;
}

export interface EventRegistration {
    id: number;
    event: Event;
    participant: User;
    created_at: Date;
}

export type FilterState = {
    filter: 'all' | 'mine';
};

export type PayloadAction = {
    payload: FilterState['filter'];
};

export interface ViewEventRegistration {
    id: number;
    event: Event;
    participant: User;
}
