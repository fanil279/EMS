import { type FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useIsAuthModal from '../../../hooks/useIsAuth';
import useCreateEvent from '../../../hooks/useCreateEvent';
import EventsSection from '../../../components/eventsSection/EventsSection';
import Button from '../../../components/Button';
import CreateEventModal from '../../events/modals/EventModal';
import NotAuthModal from '../../auth/modals/NotAuthModal';
import eventsService from '../../../services/eventsService';
import { requireAuth } from '../../../utils/requireAuth';
import type { RootState} from '../../../store';
import type { Event } from '../../../types';

const Dashboard: FC = () => {
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { showNotAuthModal, setShowNotAuthModal } = useIsAuthModal();

    const [latestEvents, setLatestEvents] = useState<Event[] | null>(null);
    const { showCreateEventModal, setShowCreateEventModal } = useCreateEvent();

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
            <section className='bg-blue-800 min-h-[70vh] flex flex-col items-center justify-center border-b border-blue-700 text-white text-center px-4'>
                <div>
                    <h1 className='text-5xl md:text-6xl font-bold mb-6'>
                        Discover Amazing Events
                    </h1>
                    <h3 className='text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto'>
                        Find and register for conferences, workshops, and networking events happening near you.
                    </h3>
                </div>

                <div className='flex flex-col md:flex-row gap-4'>
                    <Button
                        variant='primary'
                        onClick={() =>
                            requireAuth(
                                isAuthenticated,

                                () => {
                                    navigate('/events', { replace: true });
                                },

                                () => setShowNotAuthModal(true)
                            )
                        }
                    >
                        Events
                    </Button>

                    <Button
                        variant='primary'
                        onClick={() =>
                            requireAuth(
                                isAuthenticated,

                                () => {
                                    setShowCreateEventModal(true);
                                },
                                
                                () => setShowNotAuthModal(true)
                            )
                        }
                    >  
                        Create Event
                    </Button>
                    
                    {showCreateEventModal && <CreateEventModal onClose={() => setShowCreateEventModal(false)} />}
                    {showNotAuthModal && <NotAuthModal onClose={() => setShowNotAuthModal(false)} />}
                </div>
            </section>

            <section>
                <EventsSection />

                {latestEvents && latestEvents.length > 5 && (
                    <div className='flex justify-center bg-blue-900/50 pb-12'>
                        <Button
                            variant='secondary'
                            className='mt-4 w-100'
                            onClick={() =>
                                requireAuth(
                                    isAuthenticated,

                                    () => {
                                        navigate('/events', { replace: true });
                                    },

                                    () => setShowNotAuthModal(true)
                                )
                            }
                        >
                            More events
                        </Button>

                        {showNotAuthModal && <NotAuthModal onClose={() => setShowNotAuthModal(false)} />}
                    </div>
                )}
            </section>
        </>
    );
};

export default Dashboard;
