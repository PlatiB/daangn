// 지역 데이터 유틸리티 함수들

/**
 * ID로 특정 지역 찾기
 * @param locations 지역 배열
 * @param id 지역 ID
 * @returns Location 객체 또는 undefined
 */
export const getLocationById = (locations, id) => {
  return locations.find(location => location.id === id);
};

/**
 * 구/군으로 지역들 필터링
 * @param locations 지역 배열
 * @param district 구/군명
 * @returns 해당 구/군의 지역 배열
 */
export const getLocationsByDistrict = (locations, district) => {
  return locations.filter(location => location.district === district);
};

/**
 * 인기 지역만 필터링
 * @param locations 지역 배열
 * @returns 인기 지역 배열
 */
export const getPopularLocations = (locations) => {
  return locations.filter(location => location.popular === true);
};

/**
 * 이름으로 지역 검색 (부분 일치)
 * @param locations 지역 배열
 * @param searchTerm 검색어
 * @returns 검색 결과 지역 배열
 */
export const searchLocationsByName = (locations, searchTerm) => {
  const term = searchTerm.toLowerCase().trim();
  
  if (!term) return [];
  
  return locations.filter(location => 
    location.name.toLowerCase().includes(term) ||
    location.district.toLowerCase().includes(term)
  );
};

/**
 * 지역명 포맷팅 (구/군 정보 포함)
 * @param location Location 객체
 * @returns 포맷된 지역명
 */
export const formatLocationName = (location) => {
  if (location.district && location.district !== location.name) {
    return `${location.name}, ${location.district}`;
  }
  return location.name;
};

/**
 * 지역 코드로 지역 찾기
 * @param locations 지역 배열
 * @param code 지역 코드
 * @returns Location 객체 또는 undefined
 */
export const getLocationByCode = (locations, code) => {
  return locations.find(location => location.code === code);
};

/**
 * 모든 지역 목록 가져오기
 * @param locations 지역 배열
 * @returns 전체 지역 배열
 */
export const getAllLocations = (locations) => {
  return [...locations]; // 복사본 반환
};

/**
 * 구/군별로 지역 그룹화
 * @param locations 지역 배열
 * @returns 구/군별로 그룹화된 지역 맵
 */
export const getLocationsByDistrictMap = (locations) => {
  const districtMap = new Map();
  
  locations.forEach(location => {
    const district = location.district || '기타';
    
    if (!districtMap.has(district)) {
      districtMap.set(district, []);
    }
    
    districtMap.get(district)?.push(location);
  });
  
  return districtMap;
};

/**
 * 인기 지역 개수 조회
 * @param locations 지역 배열
 * @returns 인기 지역 개수
 */
export const getPopularLocationCount = (locations) => {
  return locations.filter(location => location.popular === true).length;
};