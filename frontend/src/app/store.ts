import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from '@/features/auth/authSlice.ts';
import { authApiSlice } from '@/features/auth/authApiSlice.ts';
import persistReducer from 'redux-persist/lib/persistReducer';
import type { PersistConfig } from 'redux-persist';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PERSIST, REHYDRATE } from 'redux-persist/lib/constants';
import { notesApiSlice } from '@/features/notes/notesApiSlice.ts';
import { themesApiSlice } from '@/features/themes/themesApiSlice.ts';
import { notesSlice } from '@/features/notes/notesSlice.ts';

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  authApiSlice,
  authSlice,
  notesSlice,
  notesApiSlice,
  themesApiSlice,
);

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export type PersistState = ReturnType<typeof persistedReducer>;

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: PersistState) => {
  const store = configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [REHYDRATE, PERSIST],
        },
      }).concat(
        authApiSlice.middleware,
        notesApiSlice.middleware,
        themesApiSlice.middleware,
      );
    },
    preloadedState,
  });
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
