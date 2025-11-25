import { type FC, useState, useEffect } from 'react';
import Button from '../../../components/Button';
import eventsService from '../../../services/eventsService';
import type { Event } from '../../../types';

const Events: FC = () => {
    const [events, setEvents] = useState<Event[] | null>(null);

    useEffect(() => {
        const loadLatestEvents = async () => {
            try {
                const data = await eventsService.getEvents();
                if (data) setEvents(data as Event[]);
            } catch (err) {
                console.error('Error fetching latest events:', err);
            }
        };
        
        loadLatestEvents();
    }, []);

    return (
        <section className='bg-blue-900/50 backdrop-blur-md py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                
                <div className='mb-12'>
                    <h2 className='text-4xl font-bold text-white mb-2'>All Events</h2>
                    <p className='text-blue-100 text-lg text-white'>Familiarise with all events managed in EventHub</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {events?.map((event) => (
                        <div
                            key={event.id}
                            className='
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
                            '
                        >
                            <h3 className='text-xl font-semibold'>{event.title}</h3>

                            <p className='text-gray-200 text-sm line-clamp-3'>{event.description}</p>

                            <div className='text-sm text-gray-300 space-y-1'>
                                <p><span className='font-medium text-white'>Starts:</span> {new Date(event.start_date).toLocaleString()}</p>
                                <p><span className='font-medium text-white'>Ends:</span> {new Date(event.end_date).toLocaleString()}</p>
                                <p><span className='font-medium text-white'>Registration deadline:</span> {new Date(event.registration_deadline).toLocaleString()}</p>
                            </div>

                            <div className='pt-2 text-gray-300 text-sm'>
                                <p><span className='font-medium text-white'>Organiser:</span> {event.organiser.institution?.name ? event.organiser.institution.id : event.organiser.name}</p>
                                <p><span className='font-medium text-white'>Location:</span> {event.location}</p>
                            </div>

                            <Button
                                variant='primary'
                                className='mt-4 w-full'
                                // onClick={}
                            >
                                Register for event
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
