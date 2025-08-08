import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories, fetchLocations, fetchPopularTags } from '../../services/api';
import { setLocations } from './locationSlice';

// Category 타입 정의 - 기존 AppContext와 일치
export interface Category {
  id: string;
  name: string;
  icon: string;
  iconPath?: string;
  description: string;
  href: string;
  color: string;
  permission?: 'public' | 'member' | 'premium';
}

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  popularTags: string[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: CategoryState = {
  categories: [],
  selectedCategory: null,
  popularTags: [],
  loading: false,
  error: null,
  initialized: false,
};

// 앱 초기 데이터 로딩
export const initializeApp = createAsyncThunk(
  'category/initializeApp',
  async (_: void, { dispatch }) => {
    const [categories, locations, popularTags] = await Promise.all([
      fetchCategories(),
      fetchLocations(),
      fetchPopularTags(),
    ]);

    // locations는 locationSlice로 위임
    dispatch(setLocations(locations));

    return { categories, popularTags };
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
    setPopularTags: (state, action: PayloadAction<string[]>) => {
      state.popularTags = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.popularTags = action.payload.popularTags;
        state.loading = false;
        state.initialized = true;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? '앱 초기화에 실패했습니다.';
        state.initialized = true;
      });
  },
});

export const { 
  setCategories, 
  setSelectedCategory, 
  setPopularTags, 
  setLoading, 
  setError, 
  setInitialized 
} = categorySlice.actions;
export default categorySlice.reducer; 