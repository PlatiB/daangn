import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Location } from '../../services/api';

interface LocationState {
  selectedLocation: string;
  availableLocations: Location[];
  locations: Location[];
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  selectedLocation: '정자동',
  availableLocations: [],
  locations: [],
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    },
    setAvailableLocations: (state, action: PayloadAction<Location[]>) => {
      state.availableLocations = action.payload;
    },
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedLocation, setAvailableLocations, setLocations, setLoading, setError } = locationSlice.actions;
export default locationSlice.reducer; 