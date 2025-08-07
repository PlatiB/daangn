import { useRef, useEffect, useState } from 'react';
import { getPopularLocations } from '../../utils/locationUtils';
import { useAppContext } from '../../contexts';
import './LocationSelector.css';

/**
 * 지역 선택 드롭다운 컴포넌트
 * 당근마켓 스타일의 지역 선택기
 */
function LocationSelector({ selectedLocation, onLocationChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useAppContext();
  // Refs
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // 인기 지역과 전체 지역 분리
  const popularLocations = getPopularLocations(state.locations);
  const allLocations = state.locations;

  // 외부 클릭 감지로 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 키보드 이벤트 핸들러
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
    }
  };

  // 드롭다운 토글 핸들러
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // 지역 선택 핸들러
  const handleLocationSelect = (location) => {
    onLocationChange(location.name);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  // 지역 아이템 키보드 핸들러
  const handleLocationKeyDown = (event, location) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLocationSelect(location);
    }
  };

  return (
    <div
      className="location-selector"
      ref={dropdownRef}
    >
      {/* 드롭다운 버튼 - 원본 디자인 복원 */}
      <button
        ref={buttonRef}
        type="button"
        className={`location-button ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-label={`현재 선택된 지역: ${selectedLocation}. 지역 변경하기`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* 위치 아이콘 - 원본 SVG 사용 */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="location-icon"
          aria-hidden="true"
        >
          <g>
            <path 
              d="M12.0022 0.498047C6.10466 0.498047 2.06836 4.96307 2.06836 10.4215C2.06836 14.28 4.55706 17.553 6.82617 19.7593C7.98687 20.8782 9.1371 21.7775 10.005 22.3944C10.4679 22.7331 10.9513 23.0575 11.448 23.346C11.7722 23.5342 12.2218 23.5551 12.546 23.3669C13.0436 23.078 13.5163 22.7313 13.989 22.4049C14.8569 21.7879 16.0072 20.8887 17.1679 19.7698C19.437 17.5634 21.9257 14.3009 21.9257 10.4319C21.9361 4.96307 17.8998 0.498047 12.0022 0.498047ZM12.0022 14.4787C9.76451 14.4787 7.94504 12.6592 7.94504 10.4215C7.94504 8.18374 9.76451 6.36427 12.0022 6.36427C14.24 6.36427 16.0595 8.18374 16.0595 10.4215C16.0595 12.6592 14.24 14.4787 12.0022 14.4787Z" 
              fill="currentColor"
            />
          </g>
        </svg>
        
        {/* 지역명 텍스트 */}
        <span className="location-text">{selectedLocation}</span>
        
        {/* 드롭다운 화살표 - 원본 SVG 사용 */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`dropdown-arrow ${isOpen ? 'up' : 'down'}`}
          aria-hidden="true"
        >
          <g>
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M21.3991 6.93106C20.9192 6.47398 20.1596 6.49248 19.7025 6.97238L11.9995 15.06L4.29762 6.97244C3.84057 6.49251 3.081 6.47396 2.60107 6.93101C2.12114 7.38805 2.10258 8.14762 2.55963 8.62756L11.1305 17.6276C11.357 17.8654 11.671 18 11.9994 18C12.3278 18 12.6419 17.8654 12.8684 17.6276L21.4404 8.62762C21.8975 8.14771 21.879 7.38814 21.3991 6.93106Z" 
              fill="currentColor"
            />
          </g>
        </svg>
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
            {allLocations.length > 0 && (
              <>
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
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LocationSelector;
