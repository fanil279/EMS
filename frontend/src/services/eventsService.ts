import axiosInstance from '../config/axios';
import type { Event } from '../types';

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
}

export default new EventService();
