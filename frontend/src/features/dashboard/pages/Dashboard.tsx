import { type FC, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import eventsService from '../../../services/eventsService';
import type { Event } from '../../../types';

const Dashboard: FC = () => {
    const [latestEvents, setLatestEvents] = useState<Event[] | null>(null);

    useEffect(() => {
        const loadLatestEvents = async () => {
            try {
                const data = await eventsService.getLatestEvents();
                if (data) setLatestEvents(data as Event[]);
            } catch (err) {
                console.error('Error fetching latest events:', err);
            }
        };
        loadLatestEvents();
    }, []);

    return (
        <>
            <section className="bg-blue-800 min-h-[70vh] flex flex-col items-center justify-center border-b border-blue-700 text-white text-center px-4">
                <div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Discover Amazing Events
                    </h1>
                    <h3 className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Find and register for conferences, workshops, and networking events happening near you.
                    </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <Button variant="primary">Browse Events</Button>
                    <Button variant="primary">Create Event</Button>
                </div>
            </section>

            <section className='bg-blue-900/50 backdrop-blur-md py-20'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold text-white mb-2">Upcoming Events</h2>
                        <p className="text-blue-100 text-lg text-white">Browse our curated selection of premium events</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestEvents?.map((event) => (
                            <div
                                key={event.id}
                                className="
                                    bg-slate-950/15
                                    backdrop-blur 
                                    border border-white/10 
                                    rounded-xl 
                                    p-6 
                                    space-y-3
                                    transition-transform 
                                    hover:scale-[1.02]
                                    hover:bg-slate-950/25
                                    text-white
                                "
                            >
                                <h3 className="text-xl font-semibold">{event.title}</h3>

                                <p className="text-gray-200 text-sm line-clamp-3">{event.description}</p>

                                <div className="text-sm text-gray-300 space-y-1">
                                    <p><span className="font-medium text-white">Starts:</span> {new Date(event.start_date).toLocaleString()}</p>
                                    <p><span className="font-medium text-white">Ends:</span> {new Date(event.end_date).toLocaleString()}</p>
                                    <p><span className="font-medium text-white">Registration deadline:</span> {new Date(event.registration_deadline).toLocaleString()}</p>
                                </div>

                                <div className="pt-2 text-gray-300 text-sm">
                                    <p><span className="font-medium text-white">Organiser:</span> {event.organiser.institution?.name ? event.organiser.institution.id : event.organiser.name}</p>
                                    <p><span className="font-medium text-white">Location:</span> {event.location}</p>
                                </div>

                                <Button
                                    variant="primary"
                                    className="mt-4 w-full"
                                    //onClick={}
                                >
                                    View Details
                                </Button>

                                {latestEvents.length > 6 && (
                                    <div className='flex justify-center mt-12'>
                                        <Button
                                            variant="secondary"
                                            className="mt-4 w-100"
                                            //onClick={}
                                        >
                                            More events
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
