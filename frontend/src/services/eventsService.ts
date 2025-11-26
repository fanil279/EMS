import axiosInstance from '../config/axios';
import type { Event, EventPayload } from '../types';

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
            console.error('Error fetching latest events:', err);
            
            throw err;
        }
    }

    async createEvent(payload: EventPayload): Promise<Event | null> {
        try {
            const response = await axiosInstance.post('events/events/', payload);
            
            return response.data;
        } catch (err) {
            console.error('Error fetching latest events:', err);
            
            throw err;
        }
    }

    async editEventPartial(payload: Partial<EventPayload>, id: number): Promise<Event | null> {
        try {
            const response = await axiosInstance.patch(`events/events/${id}/`, payload);
            
            return response.data;
        } catch (err) {
            console.error('Error fetching latest events:', err);
            
            throw err;
        }
    }

    async editEvent(payload: EventPayload, id: number): Promise<Event | null> {
        try {
            const response = await axiosInstance.put(`events/events/${id}/`, payload);
            
            return response.data;
        } catch (err) {
            console.error('Error fetching latest events:', err);
            
            throw err;
        }
    }

    async delteEvent(id: number): Promise<void> {
        try {
            await axiosInstance.delete(`events/events/${id}/`);
        } catch (err) {
            console.error('Error fetching latest events:', err);
            
            throw err;
        }
    }
}

export default new EventService();
