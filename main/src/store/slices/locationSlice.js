import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setAvailableLocations: (state, action) => {
      state.availableLocations = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSelectedLocation, setAvailableLocations, setLocations, setLoading, setError } = locationSlice.actions;
export default locationSlice.reducer; 