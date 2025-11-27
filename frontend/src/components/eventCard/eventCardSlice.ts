import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventRegistrationState, EventRegistration } from '../../types';

const initialState: EventRegistrationState = {
    registrations: {},
}

const eventRegistrationSlice = createSlice({
    name: 'eventRegistration',
    initialState,

    reducers: {
        setRegistered: (state, action: PayloadAction<EventRegistration>) => {
            const eventId = Number(action.payload.event.id);

            state.registrations = {
                ...state.registrations,
                [eventId]: action.payload,
            };
        },
    }
});

export const { setRegistered } = eventRegistrationSlice.actions;

export default eventRegistrationSlice.reducer;
