import axios from 'axios';

const API_BASE_URL = 'https://mock.apidog.com/m1/1029794-1016631-default';

export interface Category {
  id: string;
  name: string;
  icon: string;
  iconPath: string;
  description: string;
  href: string;
  color: string;
  permission: 'public' | 'member' | 'premium';
}

export interface Location {
  id: string;
  name: string;
  code: string;
  district: string;
  popular: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface LocationsResponse {
  locations: Location[];
}

export interface PopularTagsResponse {
  popularTags: string[];
}

// Fallback 데이터
const FALLBACK_POPULAR_TAGS = [
  '에어컨', '노트북', '원룸', '현대 중고차', '아이폰', '갤럭시', '맥북', '아이패드',
  '자전거', '의자', '테이블', '옷장', '냉장고', '세탁기', 'TV', '컴퓨터', '책상'
];

const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 'buy-sell',
    name: '중고거래',
    icon: '🛍️',
    iconPath: '<path d="M9.84309 4.75124C9.36967 4.95223 9.14891 5.49889 9.35001 5.97226L12.2977 12.9108C12.4988 13.3841 13.0456 13.6049 13.519 13.404L20.0229 10.6428C20.4963 10.4419 20.7171 9.89519 20.516 9.42182L17.5683 2.48332C17.3672 2.00995 16.8204 1.78915 16.347 1.99013L9.84309 4.75124Z" fill="#FFCB64"></path>',
    description: '믿을만한 이웃 간 중고거래',
    href: '/kr/buy-sell',
    color: '#FF6F0F',
    permission: 'public'
  },
  {
    id: 'jobs',
    name: '알바',
    icon: '💼',
    iconPath: '<path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" fill="#FF6F0F"/>',
    description: '당근에서 구하는 알바',
    href: '/kr/jobs',
    color: '#FF6F0F',
    permission: 'public'
  }
];

// API 호출 함수들
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<CategoriesResponse> = await response.json();
    return data.data.categories;
  } catch (error) {
    console.warn('Failed to fetch categories, using fallback data:', error);
    return FALLBACK_CATEGORIES;
  }
};

export const fetchLocations = async (): Promise<Location[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<LocationsResponse> = await response.json();
    return data.data.locations;
  } catch (error) {
    console.warn('Failed to fetch locations, using fallback data:', error);
    // 기본 지역 데이터 반환
    return [
      { id: '1339', name: '정자동', code: '1339', district: '분당구', popular: true },
      { id: '1340', name: '분당구', code: '1340', district: '성남시', popular: true }
    ];
  }
};

export const fetchPopularTags = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags`, {
      timeout: 5000 // 5초 타임아웃 설정
    });
    const data: ApiResponse<PopularTagsResponse> = response.data;
    return data.data.popularTags;
  } catch (error) {
    console.warn('Failed to fetch popular tags, using fallback data:', error);
    return FALLBACK_POPULAR_TAGS;
  }
}; 