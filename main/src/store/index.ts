import { configureStore } from '@reduxjs/toolkit';
import locationSlice from './slices/locationSlice';
import searchSlice from './slices/searchSlice';
import categorySlice from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    location: locationSlice,
    search: searchSlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 