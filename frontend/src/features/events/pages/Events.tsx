import { type FC } from 'react';
import useCreateEvent from '../../../hooks/useCreateEvent';
import Button from '../../../components/Button';
import CreateEventModal from '../modals/EventModal';
import EventsSection from '../../../components/eventsSection/EventsSection';

const Events: FC = () => {
    const { showCreateEventModal, setShowCreateEventModal } = useCreateEvent();

    return (
        <>
            <div className='bg-blue-900/50'>
                <Button
                    variant='secondary'
                    className='float-right mt-19.5 mr-10'
                    close={false}
                    onClick={() => {
                        setShowCreateEventModal(true);
                    }}
                >
                    Create Event
                </Button>

                {showCreateEventModal && <CreateEventModal onClose={() => setShowCreateEventModal(false)} />}
            </div>

            <EventsSection />
        </>
    );
};

export default Events;
