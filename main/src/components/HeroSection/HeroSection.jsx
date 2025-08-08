// HeroSection 컴포넌트 - 간결한 Redux 버전
// selector 없이 직접 state 접근

import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocationSelector from './LocationSelector';
import SearchBar from './SearchBar';
import PopularTags from './PopularTags.jsx';
import { animatedKeywords } from '../../data/mockData';
import { setSearchValue } from '../../store/slices/searchSlice';
import { setSelectedLocation } from '../../store/slices/locationSlice';
import './HeroSection.css';

function HeroSection() {
  const dispatch = useDispatch();

  // Redux store에서 직접 데이터 가져오기 (selector 없이)
  const searchValue = useSelector(state => state.search.searchValue);
  const selectedLocation = useSelector(state => state.location.selectedLocation);

  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [selectedService, setSelectedService] = useState("중고거래");

  // 애니메이션 키워드 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword(prev => (prev + 1) % animatedKeywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTagClick = useCallback((tag) => {
    console.log('태그 클릭으로 검색어 설정:', tag);
    dispatch(setSearchValue(tag));
  }, [dispatch]);

  const handleLocationChange = useCallback((location) => {
    dispatch(setSelectedLocation(location));
  }, [dispatch]);

  // Search handlers
  const handleSearchChange = useCallback((value) => {
    // 디바운스된 값을 받아서 처리
    console.log('디바운스된 검색어:', value);
    dispatch(setSearchValue(value));

    // 여기서 자동완성 API 호출 등을 수행할 수 있습니다
    // 예: fetchAutoComplete(value);
  }, [dispatch]);

  const handleSearchSubmit = useCallback((value) => {
    console.log('Search submitted:', value);

    // 검색어 유효성 검사
    if (!value || value.trim().length < 1) {
      console.log('검색어가 비어있습니다.');
      return;
    }

    const trimmedValue = value.trim();

    // 실제 검색 로직 구현 (향후 API 호출로 대체)
    console.log(`[${selectedService}] "${trimmedValue}" 검색을 시작합니다...`);
  }, [selectedService]);

  const handleServiceChange = useCallback((service) => {
    console.log('Service changed:', service);
    setSelectedService(service);
  }, []);


  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">
          <span className="location-text">{selectedLocation}</span>
          <span>에서</span><br/>
          <span
            className="animated-text"
            key={currentKeyword}
          >
            {animatedKeywords[currentKeyword]}
          </span>
          <span>찾고 계신가요?</span>
        </h1>

        <div className="hero-controls">
          <div className="location-selector-container">
            <LocationSelector
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange}
            />
          </div>

          {/* SearchBar 컴포넌트 - Redux와 통합, 디바운스 유지 */}
          <SearchBar
            value={searchValue}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            selectedService={selectedService}
            onServiceChange={handleServiceChange}
          />
        </div>

        {/* PopularTags를 HeroSection 안으로 이동 */}
        <PopularTags onTagClick={handleTagClick} />
      </div>
    </section>
  );
}

export default HeroSection;