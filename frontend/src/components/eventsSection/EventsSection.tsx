import { type FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegistered } from './eventCardSlice';
import useIsAuthModal from '../../hooks/useIsAuth';
import Button from '../Button';
import EventModal from '../../features/events/modals/EventModal';
import NotAuthModal from '../../features/auth/modals/NotAuthModal';
import eventsService from '../../services/eventsService';
import { requireAuth } from '../../features/dashboard/pages/Dashboard';
import type { RootState, AppDispatch } from '../../store';
import type { Event } from '../../types';

const EventCard: FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const registrations = useSelector((state: RootState) => state.eventRegistration.registrations);

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const [events, setEvents] = useState<Event[] | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [showEventModal, setShowEventModal] = useState<boolean>(false);

    const { showNotAuthModal, setShowNotAuthModal } = useIsAuthModal();

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
        <div className={events?.length! > 0 ? 'bg-blue-900/50 py-20' : 'bg-blue-900/50 py-55'}>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                
                <div className='mb-12'>
                    <h2 className='text-4xl font-bold text-white mb-2'>All Events</h2>
                    <p className='text-blue-100 text-lg text-white'>
                        Familiarise with all events managed in EventHub
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {events?.map((event) => {
                        return (
                            <div
                                key={event.id}
                                className='
                                    flex flex-col
                                    bg-slate-800/25
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
                                <h3 className='text-xl font-semibold mt-12'>{event.title}</h3>

                                <p className='text-gray-200 text-sm line-clamp-3'>{event.description}</p>

                                <div className='text-sm text-gray-300 space-y-1'>
                                    <p><span className='font-medium text-white'>Starts:</span> {new Date(event.start_date).toLocaleString()}</p>
                                    <p><span className='font-medium text-white'>Ends:</span> {new Date(event.end_date).toLocaleString()}</p>
                                    <p><span className='font-medium text-white'>Registration deadline:</span> {new Date(event.registration_deadline).toLocaleString()}</p>
                                </div>

                                <div className='pt-2 text-gray-300 text-sm'>
                                    <p>
                                        <span className='font-medium text-white'>Organiser: </span>
                                        {event.organiser.institution?.name ? event.organiser.institution.name : event.organiser.name}
                                    </p>
                                    <p><span className='font-medium text-white'>Location:</span> {event.location}</p>
                                </div>

                                <Button
                                    variant={registrations[event.id] ? 'success' : 'primary'}
                                    className={registrations[event.id] ? 'pointer-events-none' : 'mt-4 w-full'}
                                    onClick={() => {
                                        requireAuth(async () => {
                                            const eventRegistered = await eventsService.registerEvent({ event_id: event.id });
                                            
                                            if (eventRegistered) {
                                                dispatch(setRegistered(eventRegistered));
                                            }
                                        }, isAuthenticated);
                                    }}
                                >
                                    {registrations[event.id] ? (
                                        <span>Registered</span>
                                    ) : (
                                        <span>Register for event</span>
                                    )}
                                </Button>

                                {userId === event.organiser.id && (
                                    <div className='flex gap-3'>
                                        <Button
                                            variant='tertiary'
                                            onClick={() => {
                                                requireAuth(() => {
                                                    setSelectedEventId(event.id);
                                                    setShowEventModal(true);
                                                }, isAuthenticated);
                                            }}
                                        >
                                            Edit event
                                        </Button>

                                        <Button
                                            variant='tertiary'
                                            onClick={() => {
                                                requireAuth(async () => {
                                                    await eventsService.deleteEvent(event.id);
            
                                                    setEvents(prev => prev ? prev.filter(e => e.id !== event.id) : null);
                                                }, isAuthenticated)
                                            }}
                                        >
                                            Delete event
                                        </Button>
                                    </div>
                                )}

                                {showNotAuthModal && <NotAuthModal onClose={() => setShowNotAuthModal(false)} />}
                            </div>
                        );
                    })}
                </div>
            </div>

            {showEventModal && (
                <EventModal
                    onClose={() => setShowEventModal(false)}
                    action={selectedEventId != null}
                    onEventUpdated={(updatedEvent: Event) => {
                        setEvents((prev) => prev
                            ? prev.map((e) => e.id === updatedEvent.id ? updatedEvent : e)
                            : [updatedEvent]
                        );
                    }}
                    eventId={selectedEventId!}
                />
            )}
        </div>
    );
};

export default EventCard;
