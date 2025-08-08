import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 - 검색 관련 데이터
const initialState = {
  searchValue: '',
  searchHistory: [],
  loading: false,
  error: null,
};

// 검색 슬라이스 - 간결한 버전
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // 검색어 설정
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    // 검색 기록에 추가
    addToSearchHistory: (state, action) => {
      const newSearch = action.payload.trim();
      if (newSearch && !state.searchHistory.includes(newSearch)) {
        state.searchHistory.unshift(newSearch);
        // 최대 10개까지만 유지
        if (state.searchHistory.length > 10) {
          state.searchHistory = state.searchHistory.slice(0, 10);
        }
      }
    },

    // 검색 기록 초기화
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },

    // 로딩 상태 설정
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // 에러 설정
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// 액션 export
export const {
  setSearchValue,
  addToSearchHistory,
  clearSearchHistory,
  setLoading,
  setError
} = searchSlice.actions;

// 리듀서 export
export default searchSlice.reducer;