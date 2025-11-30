import { type FC, useState, useEffect } from 'react';
import Button from '../../../components/Button';
import eventsService from '../../../services/eventsService';
import type { ModalProps, ViewEventRegistration } from '../../../types';

const EventDetailsModal: FC<ModalProps> = ({ onClose, eventId }) => {
    const [_eventDetails, setEventDetails] = useState<ViewEventRegistration | null>(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            if (!eventId) return;

            const data = await eventsService.viewEventRegistrations(eventId);

            if (data) {
                setEventDetails(data);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
            <div className='relative w-full max-w-2xl bg-white rounded-2xl p-8 shadow-xl'>
                <Button
                    onClick={onClose}
                    close={true}
                >
                    &times;
                </Button>

                <h1 className='text-3xl font-semibold mb-6 text-center text-gray-800'>Event Details</h1>

                <div className='space-y-5'>
                    <div>
                        <label className='block mb-1 mr-100 font-medium text-gray-700'>Title</label>
                        
                        <input
                            type='text'
                            placeholder='Event title'
                            //value={}
                            //onChange={}
                            className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block mb-1 mr-100 font-medium text-gray-700'>Description</label>

                        <textarea
                            placeholder='Write about your event...'
                            //value={}
                            //onChange={}
                            className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block mb-1 mr-100 font-medium text-gray-700'>Location</label>

                        <input
                            type='text'
                            placeholder='Event location'
                            //value={}
                            //onChange={}
                            className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label className='block mb-1 font-medium text-gray-700'>Start Date</label>

                            <input
                                type='date'
                                //value={}
                                //onChange={}
                                className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div>
                            <label className='block mb-1 font-medium text-gray-700'>End Date</label>

                            <input
                                type='date'
                                //value={}
                                //onChange={}
                                className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='block mb-1 font-medium text-gray-700'>
                            Registration Deadline
                        </label>

                        <input
                            type='date'
                            //value={}
                            //onChange={}
                            className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;
