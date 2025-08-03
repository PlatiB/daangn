import { useState, useEffect, useCallback } from 'react';
import LocationSelector from './LocationSelector';
import SearchBar from './SearchBar';
import PopularTags from './PopularTags';
import { currentLocation, animatedKeywords } from '../../data/mockData';
import './HeroSection.css';

function HeroSection() {
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(currentLocation.name);
  const [selectedService, setSelectedService] = useState("중고거래");

  // 애니메이션 키워드 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword(prev => (prev + 1) % animatedKeywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    console.log('태그 클릭으로 검색어 설정:', tag);
    setSearchTerm(tag);
  }, []);

  const handleLocationChange = useCallback((location: string) => {
    setSelectedLocation(location);
  }, []);

  // Search handlers
  const handleSearchChange = useCallback((value: string) => {
    // 디바운스된 값을 받아서 처리
    console.log('디바운스된 검색어:', value);
    setSearchTerm(value);

    // 여기서 자동완성 API 호출 등을 수행할 수 있습니다
    // 예: fetchAutoComplete(value);
  }, []);

  const handleSearchSubmit = useCallback((value: string) => {
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

  const handleServiceChange = useCallback((service: string) => {
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

          {/* SearchBar 컴포넌트 - value prop 추가하여 태그 클릭 시 자동 입력 지원 */}
          <SearchBar
            value={searchTerm}
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
