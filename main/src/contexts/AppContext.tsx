import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCategories, fetchLocations, fetchPopularTagsWithAxios } from '../services/api';

// Context 생성
const AppContext = createContext(undefined);

// Provider 컴포넌트
export function AppProvider({ children }) {
  const [state, setState] = useState({
    selectedLocation: '정자동',
    searchValue: '',
    categories: [],
    popularTags: [],
    locations: [],
    loading: false,
    error: null,
    initialized: false
  });

  const actions = {
    setSelectedLocation: (location) => 
      setState(prev => ({ ...prev, selectedLocation: location })),
    
    setSearchValue: (value) => 
      setState(prev => ({ ...prev, searchValue: value })),
    
    setCategories: (categories) => 
      setState(prev => ({ ...prev, categories })),
    
    setPopularTags: (tags) => 
      setState(prev => ({ ...prev, popularTags: tags })),
    
    setLocations: (locations) => 
      setState(prev => ({ ...prev, locations })),
    
    setLoading: (loading) => 
      setState(prev => ({ ...prev, loading })),
    
    setError: (error) => 
      setState(prev => ({ ...prev, error })),

    initializeApp: async () => {
      // 이미 초기화되었으면 중복 실행 방지
      if (state.initialized) return;

      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // 모든 API 호출을 병렬로 실행 (PopularTags는 Axios 사용)
        const [categories, locations, popularTags] = await Promise.all([
          fetchCategories(),
          fetchLocations(),
          fetchPopularTagsWithAxios()
        ]);

        setState(prev => ({
          ...prev,
          categories,
          locations,
          popularTags,
          loading: false,
          initialized: true
        }));
      } catch (error) {
        console.warn('App initialization failed:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          initialized: true // 실패해도 초기화 완료로 표시
        }));
      }
    }
  };

  // 앱 초기화
  useEffect(() => {
    if (!state.initialized) {
      actions.initializeApp();
    }
  }, []); // 한 번만 실행

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// 커스텀 Hook
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext; 