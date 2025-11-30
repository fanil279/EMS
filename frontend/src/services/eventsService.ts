import axiosInstance from '../config/axios';
import type {
    Event,
    EventPayload,
    EventRegistration,
    EventRegistrationPayload,
    ViewEventRegistration,
} from '../types';

class EventService {
    readonly backendUrl: string;

    constructor() {
        this.backendUrl = import.meta.env.VITE_BACKEND_URL;
    }

    async getLatestEvents(): Promise<Event[] | null> {
        try {
            const response = await axiosInstance.get('events/events/latest/');
            
            return response.data;
        } catch (err) {
            console.error('Error fetching latest events:', err);

            throw err;
        }
    }

    async getEvents(): Promise<Event[] | null> {
        try {
            const response = await axiosInstance.get('events/events/');
            
            return response.data;
        } catch (err) {
            console.error('Error fetching events:', err);
            
            throw err;
        }
    }

    async createEvent(payload: EventPayload): Promise<Event | null> {
        try {
            const response = await axiosInstance.post('events/events/', payload);
            
            return response.data;
        } catch (err) {
            console.error('Error creating an event:', err);
            
            throw err;
        }
    }

    async editEventPartial(payload: Partial<EventPayload>, id: number): Promise<Event | null> {
        try {
            const response = await axiosInstance.patch(`events/events/${id}/`, payload);
            
            return response.data;
        } catch (err) {
            console.error('Error partially editing the event:', err);
            
            throw err;
        }
    }

    async editEvent(payload: EventPayload, id: number): Promise<Event | null> {
        try {
            const response = await axiosInstance.put(`events/events/${id}/`, payload);
            
            return response.data;
        } catch (err) {
            console.error('Error editing the event:', err);
            
            throw err;
        }
    }

    async deleteEvent(id: number): Promise<void> {
        try {
            await axiosInstance.delete(`events/events/${id}/`);
        } catch (err) {
            console.error('Error deleting the event:', err);
            
            throw err;
        }
    }

    async registerEvent(payload: EventRegistrationPayload): Promise<EventRegistration> {
        try {
            const response = await axiosInstance.post('events/registrations/', payload);

            return response.data;
        } catch (err) {
            console.error('Error registering for the event:', err);
            
            throw err;
        }
    }

    async viewEventRegistrations(id: number): Promise<ViewEventRegistration[] | null> {
        try {
            const response = await axiosInstance.get(`events/${id}/registrations/`);

            return response.data;
        } catch (err) {
            console.error('Error viewing event details:', err);
            
            throw err;
        }
    }
}

export default new EventService();
