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
            state.registrations[action.payload.event.id] = action.payload;
        },
    }
});

export const { setRegistered } = eventRegistrationSlice.actions;

export default eventRegistrationSlice.reducer;
