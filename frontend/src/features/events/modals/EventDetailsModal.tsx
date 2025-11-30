import { type FC, useEffect } from 'react';
import type { ModalProps } from '../../../types';

const EventDetailsModal: FC<ModalProps> = ({ onClose, eventId }) => {
    useEffect(() => {
        const eventDetails = async () => {
            
        };

        eventDetails();
    }, []);

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
            <div className='relative w-full max-w-lg bg-white rounded-2xl p-8 shadow-xl transform animate-fadeIn'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer'
                >
                    &times;
                </button>

                sss
            </div>
        </div>
    );
};

export default EventDetailsModal;
