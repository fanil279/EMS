import { useState } from 'react';

function useCreateEvent() {
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);

    return { showCreateEventModal, setShowCreateEventModal };
}

export default useCreateEvent;
