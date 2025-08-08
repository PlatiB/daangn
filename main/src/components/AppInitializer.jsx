// 앱 초기화 컴포넌트 - 간결한 버전
// useEffect로 비동기 처리를 단순하게 구현

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategories, fetchLocations, fetchPopularTagsWithAxios } from '../services/api';
import { setInitialData, setLoading } from '../store/slices/categorySlice';
import { setLocations } from '../store/slices/locationSlice';

function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // 앱 시작 시 데이터 로딩 (간단한 비동기 처리)
    const loadInitialData = async () => {
      // 로딩 시작
      dispatch(setLoading(true));

      try {
        // 모든 데이터를 동시에 가져오기
        const [categories, locations, popularTags] = await Promise.all([
          fetchCategories(),
          fetchLocations(),
          fetchPopularTagsWithAxios()
        ]);

        // 카테고리와 인기 태그 설정
        dispatch(setInitialData({ categories, popularTags }));

        // 지역 정보 설정
        dispatch(setLocations(locations));

        console.log('✅ 앱 초기화 성공');
      } catch (error) {
        console.error('❌ 앱 초기화 실패:', error);
        dispatch(setLoading(false));
      }
    };

    loadInitialData();
  }, [dispatch]);

  return children;
}

export default AppInitializer;