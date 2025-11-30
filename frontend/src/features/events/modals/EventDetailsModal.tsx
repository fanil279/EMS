import { type FC, useState, useEffect } from 'react';
import Button from '../../../components/Button';
import eventsService from '../../../services/eventsService';
import type { ModalProps, ViewEventRegistration } from '../../../types';

const EventDetailsModal: FC<ModalProps> = ({ onClose, eventId }) => {
    const [eventDetails, setEventDetails] = useState<ViewEventRegistration[] | null>(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                if (!eventId) return;

                const data = await eventsService.viewEventRegistrations(eventId);

                if (data) {
                    setEventDetails(data);
                }
            } catch (err) {
                console.error('Error fetching event details', err);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl bg-white rounded-2xl p-8 shadow-xl overflow-y-auto max-h-[90vh]">
                <Button
                    onClick={onClose} close={true}>
                    &times;
                </Button>

                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                    Event Participants
                </h1>

                {eventDetails && eventDetails.length > 0 ? (
                    <div className="space-y-4">
                        {eventDetails.map((registration) => (
                            <div
                                key={registration.id}
                                className="border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition"
                            >
                                <p className="font-medium text-gray-800">
                                    Name: <span className="font-normal">{registration.participant.name}</span>
                                </p>
                                <p className="font-medium text-gray-800">
                                    Email: <span className="font-normal">{registration.participant.email}</span>
                                </p>
                                <p className="font-medium text-gray-800">
                                    Institution:{' '}
                                    <span className="font-normal">
                                        {registration.participant.institution?.name}
                                    </span>
                                </p>
                                <p className="font-medium text-gray-800">
                                    Address:{' '}
                                    <span className="font-normal">
                                        {registration.participant.institution?.address}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10">No participants registered yet.</p>
                )}
            </div>
        </div>
    );
};

export default EventDetailsModal;
