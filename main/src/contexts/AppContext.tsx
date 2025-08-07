import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { fetchCategories, fetchLocations, fetchPopularTags } from '../services/api';

// 카테고리 타입 정의 - mockData와 일치
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

// 앱 상태 인터페이스 정의
export interface AppState {
  selectedLocation: string;
  searchValue: string;
  categories: Category[];
  popularTags: string[];
  locations: any[]; // Location 타입 추가
  loading: boolean;
  error: string | null;
  initialized: boolean; // 초기화 완료 여부
}

// Context 타입 정의
export interface AppContextType {
  state: AppState;
  actions: {
    setSelectedLocation: (location: string) => void;
    setSearchValue: (value: string) => void;
    setCategories: (categories: Category[]) => void;
    setPopularTags: (tags: string[]) => void;
    setLocations: (locations: any[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    initializeApp: () => Promise<void>;
  };
}

// Context 생성
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Props 타입
interface AppProviderProps {
  children: ReactNode;
}

// Provider 컴포넌트
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
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
    setSelectedLocation: (location: string) => 
      setState(prev => ({ ...prev, selectedLocation: location })),
    
    setSearchValue: (value: string) => 
      setState(prev => ({ ...prev, searchValue: value })),
    
    setCategories: (categories: Category[]) => 
      setState(prev => ({ ...prev, categories })),
    
    setPopularTags: (tags: string[]) => 
      setState(prev => ({ ...prev, popularTags: tags })),
    
    setLocations: (locations: any[]) => 
      setState(prev => ({ ...prev, locations })),
    
    setLoading: (loading: boolean) => 
      setState(prev => ({ ...prev, loading })),
    
    setError: (error: string | null) => 
      setState(prev => ({ ...prev, error })),

    initializeApp: async () => {
      // 이미 초기화되었으면 중복 실행 방지
      if (state.initialized) return;

      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // 모든 API 호출을 병렬로 실행
        const [categories, locations, popularTags] = await Promise.all([
          fetchCategories(),
          fetchLocations(),
          fetchPopularTags()
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
};

// 커스텀 Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext; 