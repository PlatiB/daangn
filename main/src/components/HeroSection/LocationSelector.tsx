import React, { useRef, useEffect, memo } from 'react';
import type { Location } from '../../data/mockData';
import { locations } from '../../data/mockData';
import { getPopularLocations } from '../../utils/locationUtils';
import './LocationSelector.css';

/**
 * LocationSelector 컴포넌트의 Props 인터페이스
 */
export interface LocationSelectorProps {
  /** 현재 선택된 지역명 */
  selectedLocation: string;
  /** 지역 변경 시 호출되는 콜백 함수 */
  onLocationChange: (location: string) => void;
  /** 드롭다운 열림/닫힘 상태 */
  isOpen: boolean;
  /** 드롭다운 열림/닫힘 토글 함수 */
  onToggle: (isOpen: boolean) => void;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * 지역 선택 드롭다운 컴포넌트
 * 당근마켓 스타일의 지역 선택기
 */
const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedLocation,
  onLocationChange,
  isOpen,
  onToggle,
  className = ''
}) => {
  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 인기 지역과 전체 지역 분리
  const popularLocations = getPopularLocations();
  const allLocations = locations;

  // 외부 클릭 감지로 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // 키보드 이벤트 핸들러
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        onToggle(false);
        buttonRef.current?.focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onToggle(!isOpen);
        break;
    }
  };

  // 드롭다운 토글 핸들러
  const handleToggle = () => {
    onToggle(!isOpen);
  };

  // 지역 선택 핸들러
  const handleLocationSelect = (location: Location) => {
    onLocationChange(location.name);
    onToggle(false);
    buttonRef.current?.focus();
  };

  // 지역 아이템 키보드 핸들러
  const handleLocationKeyDown = (event: React.KeyboardEvent, location: Location) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLocationSelect(location);
    }
  };

  return (
    <div 
      className={`location-selector ${className}`.trim()}
      ref={dropdownRef}
    >
      {/* 드롭다운 버튼 */}
      <button
        ref={buttonRef}
        type="button"
        className={`location-button ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`현재 선택된 지역: ${selectedLocation}. 지역 변경하기`}
      >
        <span className="location-icon">📍</span>
        <span className="location-text">{selectedLocation}</span>
        <span className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <div className="location-dropdown">
          <ul 
            className="location-list"
            role="listbox"
            aria-label="지역 목록"
          >
            {/* 인기 지역 섹션 */}
            {popularLocations.length > 0 && (
              <>
                <li className="location-section-header" role="presentation">
                  <span className="section-title">🔥 인기 지역</span>
                </li>
                {popularLocations.map((location) => (
                  <li
                    key={`popular-${location.id}`}
                    className={`location-item ${selectedLocation === location.name ? 'selected' : ''}`}
                    role="option"
                    aria-selected={selectedLocation === location.name}
                    tabIndex={0}
                    onClick={() => handleLocationSelect(location)}
                    onKeyDown={(e) => handleLocationKeyDown(e, location)}
                  >
                    <div className="location-info">
                      <span className="location-name">{location.name}</span>
                      {location.district && (
                        <span className="location-district">{location.district}</span>
                      )}
                    </div>
                    {selectedLocation === location.name && (
                      <span className="selected-indicator">✓</span>
                    )}
                  </li>
                ))}
                <li className="location-divider" role="presentation"></li>
              </>
            )}

            {/* 전체 지역 섹션 */}
            <li className="location-section-header" role="presentation">
              <span className="section-title">📍 전체 지역</span>
            </li>
            {allLocations.map((location) => (
              <li
                key={`all-${location.id}`}
                className={`location-item ${selectedLocation === location.name ? 'selected' : ''}`}
                role="option"
                aria-selected={selectedLocation === location.name}
                tabIndex={0}
                onClick={() => handleLocationSelect(location)}
                onKeyDown={(e) => handleLocationKeyDown(e, location)}
              >
                <div className="location-info">
                  <span className="location-name">{location.name}</span>
                  {location.district && (
                    <span className="location-district">{location.district}</span>
                  )}
                </div>
                {selectedLocation === location.name && (
                  <span className="selected-indicator">✓</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default memo(LocationSelector);