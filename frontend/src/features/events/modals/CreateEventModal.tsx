import { type FC, useState } from 'react';
import type { ModalProps } from '../../../types';
import eventsService from '../../../services/eventsService';

const CreateEventModal: FC<ModalProps> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [registrationDeadline, setRegistrationDeadline] = useState('');

    const handleCreateEvent = async () => {
        if  (
                !title ||
                !location ||
                !description ||
                !startDate ||
                !endDate ||
                !registrationDeadline
            )
        {
            alert('Fill in all the required fileds!');
            
            return;
        }
        
        try {
            const response = await eventsService.createEvent({
                title: title,
                description: description,
                location: location,
                start_date: startDate,
                end_date: endDate,
                registration_deadline: registrationDeadline,
            });

            if (response) onClose();
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-white rounded-2xl p-8 shadow-xl transform animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold cursor-pointer"
                >
                    &times;
                </button>

                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                    Create Event
                </h2>

                <div className="space-y-5">
                    <div>
                        <label className="block mb-1 mr-100 font-medium text-gray-700">Title</label>
                        
                        <input
                            type="text"
                            placeholder="Event title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 mr-100 font-medium text-gray-700">Description</label>

                        <textarea
                            placeholder="Write about your event..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 mr-100 font-medium text-gray-700">Location</label>

                        <input
                            type="text"
                            placeholder="Event location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium text-gray-700">Start Date</label>

                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-gray-700">End Date</label>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Registration Deadline
                        </label>

                        <input
                            type="date"
                            value={registrationDeadline}
                            onChange={(e) => setRegistrationDeadline(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <button
                    onClick={() => handleCreateEvent()}
                    className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
                >
                    Create Event
                </button>
            </div>
        </div>
    );
};

export default CreateEventModal;
