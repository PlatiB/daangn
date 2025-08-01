import { useState, useEffect } from 'react';
import { currentLocation, animatedKeywords } from '../../data/mockData';
import LocationSelector from './LocationSelector';
import './HeroSection.css';

/**
 * 당근마켓 메인 히어로 섹션 컴포넌트
 * 동적 위치 기반 메시지와 애니메이션 텍스트를 표시
 */
function HeroSection() {
  // 1. State 선언
  const [selectedLocation, setSelectedLocation] = useState(currentLocation.name);
  const [currentKeyword, setCurrentKeyword] = useState(0);

  // 2. Effect hooks - 동적 텍스트 애니메이션 (3초마다 순환)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword(prev => (prev + 1) % animatedKeywords.length);
    }, 3000);

    // cleanup 함수 필수
    return () => clearInterval(interval);
  }, []);

  // 3. Event handlers
  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation);
  };

  // 4. Render
  return (
    <section className="hero-section">
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
            />
          </div>

          {/* 검색 폼 플레이스홀더 (향후 SearchForm 컴포넌트로 교체) */}
          <div className="search-form-placeholder">
            <input
              type="text"
              className="search-input"
              placeholder="검색어를 입력해주세요"
              aria-label="검색어 입력"
            />
            <button 
              type="submit"
              className="search-button"
              aria-label="검색"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;