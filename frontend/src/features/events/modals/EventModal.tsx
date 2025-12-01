import { type FC, useState } from 'react';
import Button from '../../../components/Button';
import eventsService from '../../../services/eventsService';
import type { ModalProps, EventPayload } from '../../../types';

const CreateEventModal: FC<ModalProps> = ({ onClose, action, onEventUpdated, eventId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [registrationDeadline, setRegistrationDeadline] = useState('');

    const [error, setError] = useState<string | null>(null);

    const handleEvent = async () => {
        if (action && eventId) {
            try {
                if (title && location && description && startDate && endDate && registrationDeadline) {
                    const response = await eventsService.editEvent({
                        title,
                        description,
                        location,
                        start_date: startDate,
                        end_date: endDate,
                        registration_deadline: registrationDeadline,
                    }, eventId);

                    if (response) {
                        onEventUpdated?.(response);
                        onClose();
                    }
                } else {
                    const payload: Partial<EventPayload> = {};

                    if (title) payload.title = title;
                    if (description) payload.description = description;
                    if (location) payload.location = location;
                    if (startDate) payload.start_date = startDate;
                    if (endDate) payload.end_date = endDate;
                    if (registrationDeadline) payload.registration_deadline = registrationDeadline;

                    const response = await eventsService.editEventPartial(payload, eventId);

                    if (response) {
                        onEventUpdated?.(response);
                        onClose();
                    }
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            if (!title || !location || !description || !startDate || !endDate || !registrationDeadline) {
                alert('Fill in all the required fields!');
                return;
            }

            try {
                const start = new Date(startDate).getTime();
                const end = new Date(endDate).getTime();
                const regDeadline = new Date(registrationDeadline).getTime();
                const now = Date.now();

                if (
                    start >= now &&
                    end >= now &&
                    start <= end &&
                    regDeadline < start &&
                    regDeadline < end &&
                    regDeadline > now
                ) {
                    const response = await eventsService.createEvent({
                        title,
                        description,
                        location,
                        start_date: startDate,
                        end_date: endDate,
                        registration_deadline: registrationDeadline,
                    });

                    if (response) {
                        onEventUpdated?.(response);
                        
                        window.location.reload();
                    }
                } else {
                    setError(
                        'Please set event start date or end date or registration deadline correctly! Note that, registration deadline is set to 5am local time. (Ex: if deadline 12/01/2025, it means 12/01/2025 5am in the morning). Kindly take that into account.'
                    );
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
            <div className='relative w-full max-w-lg bg-white rounded-2xl p-8 shadow-xl'>
                <Button
                    onClick={onClose}
                    close={true}
                >
                    &times;
                </Button>

                {action ? (
                    <h2 className='text-3xl font-semibold mb-6 text-center text-gray-800'>
                        Edit Event
                    </h2>
                ) : (
                    <h2 className='text-3xl font-semibold mb-6 text-center text-gray-800'>
                        Create Event
                    </h2>
                )}

                <div className='space-y-5'>
                    <div>
                        <label className='block mb-1 mr-100 font-medium text-gray-700'>Title</label>
                        
                        <input
                            type='text'
                            placeholder='Event title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block mb-1 mr-100 font-medium text-gray-700'>Description</label>

                        <textarea
                            placeholder='Write about your event...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block mb-1 mr-100 font-medium text-gray-700'>Location</label>

                        <input
                            type='text'
                            placeholder='Event location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label className='block mb-1 font-medium text-gray-700'>Start Date</label>

                            <input
                                type='date'
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div>
                            <label className='block mb-1 font-medium text-gray-700'>End Date</label>

                            <input
                                type='date'
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
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
                            value={registrationDeadline}
                            onChange={(e) => setRegistrationDeadline(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    {error && <span className='text-red-500'>{error}</span>}
                </div>

                {action ? (
                    <Button
                        variant='primary'
                        className='w-full mt-8'
                        onClick={() => handleEvent()}
                        close={false}
                    >
                        Edit Event
                    </Button>
                ) : (
                    <Button
                        variant='primary'
                        className='w-full mt-8'
                        onClick={() => handleEvent()}
                        close={false}
                    >
                        Create Event
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateEventModal;
