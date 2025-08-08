import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchValue: string;
  searchHistory: string[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchValue: '',
  searchHistory: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const newSearch = action.payload.trim();
      if (newSearch && !state.searchHistory.includes(newSearch)) {
        state.searchHistory.unshift(newSearch);
        // 최대 10개까지만 유지
        if (state.searchHistory.length > 10) {
          state.searchHistory = state.searchHistory.slice(0, 10);
        }
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setSearchValue, 
  addToSearchHistory, 
  clearSearchHistory, 
  setLoading, 
  setError 
} = searchSlice.actions;
export default searchSlice.reducer; 