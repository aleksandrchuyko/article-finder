import { configureStore } from '@reduxjs/toolkit';
import { filterSlice } from './filter-slice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { articlesApi } from './articles-api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    [filterSlice.name]: filterSlice.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      articlesApi.middleware,
    ];
  },
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
