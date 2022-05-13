import { configureStore } from '@reduxjs/toolkit'
import {
    persistReducer,
    PERSIST,
    PURGE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers/rootReducer'
import logger from 'redux-logger';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            {
                serializableCheck: {
                    ignoredActions: [PERSIST, PURGE],
                },
            }
        )
})

export default store;