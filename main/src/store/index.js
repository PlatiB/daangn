import { configureStore } from '@reduxjs/toolkit';
import locationSlice from './slices/locationSlice';
import searchSlice from './slices/searchSlice';
import categorySlice from './slices/categorySlice';

// 간결한 Redux Store 설정
export const store = configureStore({
  reducer: {
    location: locationSlice,
    search: searchSlice,
    category: categorySlice,
  }
  // middleware 설정 제거 - 기본값 사용
}); 