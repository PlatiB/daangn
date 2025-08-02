import React, { memo } from 'react';
import { searchConfig } from '../../data/mockData';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (searchTerm: string) => void;
  placeholder?: string;
  selectedService?: string;
  onServiceChange?: (service: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = memo(({
  value,
  onChange,
  onSubmit,
  placeholder = searchConfig.placeholder,
  selectedService = "중고거래",
  onServiceChange
}) => {
  // 검색어 유효성 검사
  const isValidSearch = value.trim().length >= searchConfig.minSearchLength;
  
  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidSearch) {
      console.log('검색어가 너무 짧습니다.');
      return;
    }
    
    onSubmit(value.trim());
  };

  // 입력 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Escape 키로 포커스 해제
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      return;
    }
    
    // Enter 키로 검색 실행 (기본 동작이므로 별도 처리 불필요)
    if (e.key === 'Enter') {
      // 폼 제출이 자동으로 처리됨
      return;
    }
  };

  // 서비스 선택 처리
  const handleServiceChange = () => {
    onServiceChange?.("중고거래");
  };

  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      {/* 서비스 선택 드롭다운 */}
      <button
        type="button"
        className="service-selector"
        aria-label="검색하려는 서비스를 선택하세요"
        onClick={handleServiceChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleServiceChange();
          }
        }}
      >
        <div className="service-selector-content">
          <span className="service-text">{selectedService}</span>
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="service-dropdown-icon"
            aria-hidden="true"
          >
            <g>
              <path 
                d="M8.17379 8C6.46508 8 5.54326 10.0042 6.65527 11.3016L10.4811 15.765C11.2792 16.6962 12.7199 16.6962 13.5181 15.765L17.3439 11.3016C18.4559 10.0042 17.5341 8 15.8253 8H8.17379Z" 
                fill="currentColor"
              />
            </g>
          </svg>
        </div>
      </button>
      
      {/* 검색 입력 영역 */}
      <div className="search-input-container">
        <div className="search-input-wrapper">
          <input
            type="search"
            className="search-input"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="검색어 입력"
            aria-describedby="search-help"
            minLength={searchConfig.minSearchLength}
            maxLength={100}
          />
          <button
            type="submit"
            className="search-button"
            aria-label="검색"
            disabled={!isValidSearch}
            aria-describedby={!isValidSearch ? "search-error" : undefined}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="search-icon"
            >
              <g>
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M11.6507 2.15225C11.1821 2.62088 11.1821 3.38068 11.6507 3.84931L18.1022 10.3008H2.99922C2.33648 10.3008 1.79922 10.8381 1.79922 11.5008C1.79922 12.1635 2.33648 12.7008 2.99922 12.7008H18.1022L11.6507 19.1523C11.1821 19.6209 11.1821 20.3807 11.6507 20.8493C12.1193 21.3179 12.8791 21.3179 13.3477 20.8493L21.8477 12.3493C22.0728 12.1243 22.1992 11.8191 22.1992 11.5008C22.1992 11.1825 22.0728 10.8773 21.8477 10.6523L13.3477 2.15225C12.8791 1.68362 12.1193 1.68362 11.6507 2.15225Z" 
                  fill="currentColor"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
      
      {/* 접근성 도움말 (스크린 리더용) */}
      <div id="search-help" className="sr-only">
        검색어를 입력하고 Enter 키를 누르거나 검색 버튼을 클릭하세요.
      </div>
      {!isValidSearch && value.length > 0 && (
        <div id="search-error" className="sr-only">
          검색어는 최소 {searchConfig.minSearchLength}자 이상 입력해주세요.
        </div>
      )}
    </form>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;