import React, { useState, useEffect, useCallback } from 'react';
import LocationSelector from './LocationSelector';
import SearchBar from './SearchBar';
import PopularTags from './PopularTags';
import { animatedKeywords } from '../../data/mockData';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setSearchValue } from '../../store/slices/searchSlice';
import { setSelectedLocation } from '../../store/slices/locationSlice';
import { selectSearchValue, selectSelectedLocation } from '../../store/selectors';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearchValue);
  const selectedLocation = useAppSelector(selectSelectedLocation);
  
  const [currentKeyword, setCurrentKeyword] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    dispatch(setSearchValue(tag));
  }, [dispatch]);

  const handleLocationChange = useCallback((location: string) => {
    dispatch(setSelectedLocation(location));
  }, [dispatch]);

  const handleDropdownToggle = useCallback((isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setSearchValue(value));
  }, [dispatch]);

  const handleSearchSubmit = useCallback((value: string) => {
    console.log('Search submitted:', value);
  }, []);

  const handleServiceChange = useCallback((service: string) => {
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
              isOpen={isDropdownOpen}
              onToggle={handleDropdownToggle}
            />
          </div>
          <div className="search-form-placeholder">
            <SearchBar
              value={searchValue}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              selectedService={selectedService}
              onServiceChange={handleServiceChange}
            />
          </div>
        </div>
        
        {/* PopularTags를 HeroSection 안으로 이동 */}
        <PopularTags onTagClick={handleTagClick} />
      </div>
    </section>
  );
};