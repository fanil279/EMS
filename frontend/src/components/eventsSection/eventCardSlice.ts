import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventRegistrationState, EventRegistration } from '../../types';

const initialState: EventRegistrationState = {
    registrations: {},
}

const eventRegistrationSlice = createSlice({
    name: 'eventRegistration',
    initialState,

    reducers: {
        setRegistered: (state, action: PayloadAction<{ userId: number; registration: EventRegistration }>) => {
            const { userId, registration } = action.payload;
            const eventId = registration.event?.id;

            if (!userId || typeof eventId !== 'number') return;

            if (!state.registrations[userId]) {
                state.registrations[userId] = {};
            }

            state.registrations[userId][eventId] = registration;
        },
    }
});

export const { setRegistered } = eventRegistrationSlice.actions;

export default eventRegistrationSlice.reducer;
