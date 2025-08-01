import React, { useState, useEffect, memo, useCallback } from 'react';
import { currentLocation, animatedKeywords } from '../../data/mockData';
import LocationSelector from './LocationSelector';
import SearchBar from './SearchBar';
import './HeroSection.css';

/**
 * HeroSection 컴포넌트의 Props 인터페이스
 */
interface HeroSectionProps {
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * 당근마켓 메인 히어로 섹션 컴포넌트
 * 동적 위치 기반 메시지와 애니메이션 텍스트를 표시
 */
const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
  // 1. State 선언
  const [selectedLocation, setSelectedLocation] = useState(currentLocation.name);
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("중고거래");

  // 2. Effect hooks - 동적 텍스트 애니메이션 (3초마다 순환)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword(prev => (prev + 1) % animatedKeywords.length);
    }, 3000);

    // cleanup 함수 필수
    return () => clearInterval(interval);
  }, []);

  // 3. Event handlers
  const handleLocationChange = (newLocation: string) => {
    setSelectedLocation(newLocation);
  };

  const handleDropdownToggle = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  // 4. Search handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
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
    
    // 검색 후 입력창 초기화 (선택사항)
    // setSearchTerm('');
  }, [selectedService]);

  // 5. Service handlers
  const handleServiceChange = useCallback((service: string) => {
    console.log('Service changed:', service);
    setSelectedService(service);
  }, []);

  // 4. Render
  return (
    <section className={`hero-section ${className}`.trim()}>
      <div className="hero-container">
        {/* 동적 제목 메시지 */}
        <h1 className="hero-title">
          <span className="location-text">{selectedLocation}</span>에서<br />
          <span className="animated-text" key={currentKeyword}>
            {animatedKeywords[currentKeyword]}
          </span>{' '}
          찾고 계신가요?
        </h1>

        {/* Location과 Search가 들어갈 컨테이너 */}
        <div className="hero-controls">
          {/* LocationSelector 드롭다운 컴포넌트 */}
          <div className="location-selector-container">
            <LocationSelector
              selectedLocation={selectedLocation}
              onLocationChange={handleLocationChange}
              isOpen={isDropdownOpen}
              onToggle={handleDropdownToggle}
            />
          </div>

          {/* SearchBar 컴포넌트 */}
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
            selectedService={selectedService}
            onServiceChange={handleServiceChange}
          />
        </div>
      </div>
    </section>
  );
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default memo(HeroSection);