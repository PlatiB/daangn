import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

// 기본 셀렉터들
const selectLocationState = (state: RootState) => state.location;
const selectSearchState = (state: RootState) => state.search;
const selectCategoryState = (state: RootState) => state.category;

// Location 관련 메모이제이션 셀렉터
export const selectSelectedLocation = createSelector(
  [selectLocationState],
  (location) => location.selectedLocation
);

export const selectAvailableLocations = createSelector(
  [selectLocationState],
  (location) => location.availableLocations
);

export const selectLocationLoading = createSelector(
  [selectLocationState],
  (location) => location.loading
);

// Search 관련 메모이제이션 셀렉터
export const selectSearchValue = createSelector(
  [selectSearchState],
  (search) => search.searchValue
);

export const selectSearchHistory = createSelector(
  [selectSearchState],
  (search) => search.searchHistory
);

export const selectSearchLoading = createSelector(
  [selectSearchState],
  (search) => search.loading
);

// Category 관련 메모이제이션 셀렉터
export const selectCategories = createSelector(
  [selectCategoryState],
  (category) => category.categories
);

export const selectSelectedCategory = createSelector(
  [selectCategoryState],
  (category) => category.selectedCategory
);

export const selectPopularTags = createSelector(
  [selectCategoryState],
  (category) => category.popularTags
);

export const selectCategoryLoading = createSelector(
  [selectCategoryState],
  (category) => category.loading
);

// 복합 셀렉터들
export const selectFilteredCategories = createSelector(
  [selectCategories, selectCategoryLoading],
  (categories, loading) => {
    if (loading) return [];
    return categories.filter(category => 
      !category.permission || category.permission === 'public'
    );
  }
);

export const selectPublicCategories = createSelector(
  [selectCategories],
  (categories) => categories.filter(category => 
    !category.permission || category.permission === 'public'
  )
);

export const selectMemberCategories = createSelector(
  [selectCategories],
  (categories) => categories.filter(category => 
    category.permission !== 'premium'
  )
);

export const selectAllCategories = createSelector(
  [selectCategories],
  (categories) => categories
); 