export interface ModalProps {
    onClose: () => void;
    action?: () => boolean;
    eventId?: number;
}
