import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 - 카테고리 관련 데이터
const initialState = {
  categories: [],
  selectedCategory: null,
  popularTags: [],
  loading: false,
  error: null,
  initialized: false,
};

// 카테고리 슬라이스 - 간결한 버전
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // 카테고리 목록 설정
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    // 선택된 카테고리 설정
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    // 인기 태그 설정
    setPopularTags: (state, action) => {
      state.popularTags = action.payload;
    },

    // 로딩 상태 설정
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // 에러 설정
    setError: (state, action) => {
      state.error = action.payload;
    },

    // 초기화 완료 설정
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },

    // 전체 초기 데이터 설정 (한번에)
    setInitialData: (state, action) => {
      state.categories = action.payload.categories || [];
      state.popularTags = action.payload.popularTags || [];
      state.loading = false;
      state.initialized = true;
      state.error = null;
    }
  }
});

// 액션 export
export const {
  setCategories,
  setSelectedCategory,
  setPopularTags,
  setLoading,
  setError,
  setInitialized,
  setInitialData
} = categorySlice.actions;

// 리듀서 export
export default categorySlice.reducer;