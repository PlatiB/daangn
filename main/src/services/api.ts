import axios from 'axios';

// API 기본 설정
const API_BASE_URL = 'https://61b7202e-9172-4a05-b87d-2be653c19666.mock.pstmn.io';

// 카테고리 데이터 가져오기
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('카테고리를 불러오는데 실패했습니다.');
    }
    const data = await response.json();
    return data.data.categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};

// 지역 데이터 가져오기
export const fetchLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) {
      throw new Error('지역 정보를 불러오는데 실패했습니다.');
    }
    const data = await response.json();
    return data.data.locations;
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    throw error;
  }
};

// 인기 검색어 데이터 가져오기 (Fetch API 버전)
export const fetchPopularTags = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tags`);
    if (!response.ok) {
      throw new Error('인기 검색어를 불러오는데 실패했습니다.');
    }
    const data = await response.json();
    return data.data.popularTags;
  } catch (error) {
    console.error('Failed to fetch popular tags:', error);
    throw error;
  }
};

// 인기 검색어 데이터 가져오기 (Axios 버전)
export const fetchPopularTagsWithAxios = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags`);
    return response.data.data.popularTags;
  } catch (error) {
    // axios 에러 처리
    if (axios.isAxiosError(error)) {
      console.error('Failed to fetch popular tags:', error.message);
      if (error.response) {
        // 서버가 응답했지만 2xx 범위 밖의 상태 코드
        throw new Error(error.response.data?.message || '인기 검색어를 불러오는데 실패했습니다.');
      } else if (error.request) {
        // 요청이 전송되었지만 응답을 받지 못함
        throw new Error('서버에서 응답을 받지 못했습니다.');
      } else {
        // 요청 설정 중 에러 발생
        throw new Error('요청 중 오류가 발생했습니다.');
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('예상치 못한 오류가 발생했습니다.');
    }
  }
}; 