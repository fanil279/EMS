import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE, PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import authReducer from '../features/auth/authSlice'
import eventRegistrationReducer from '../components/eventsSection/eventCardSlice';
import storage from 'redux-persist/lib/storage';

const persistConfigAuth = {
    key: 'auth',
    storage: storage,
    whitelist: ['isAuthenticated', 'user', 'token'],
};

const persistConfigEventReg = {
    key: 'eventRegistration',
    storage: storage,
    whitelist: ['registrations'],
};

const persistedAuthReducer = persistReducer(persistConfigAuth, authReducer);
const persistedEventRegistrationReducer = persistReducer(persistConfigEventReg, eventRegistrationReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        eventRegistration: persistedEventRegistrationReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
