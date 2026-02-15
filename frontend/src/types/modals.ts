import type { Event } from './events';

export interface ModalProps {
    onClose: () => void;
    action?: boolean;
    onEventUpdated?: (updatedEvent: Event) => void;
    eventId?: number;
};

export interface NotAuthModalProps {
    onClose: () => void;
};
