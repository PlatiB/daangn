import axios from 'axios';

const API_BASE_URL = 'https://61b7202e-9172-4a05-b87d-2be653c19666.mock.pstmn.io';

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
    console.error('Failed to fetch categories:', error);
    throw error;
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
    console.error('Failed to fetch locations:', error);
    throw error;
  }
};

export const fetchPopularTags = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags`);
    const data: ApiResponse<PopularTagsResponse> = response.data;
    return data.data.popularTags;
  } catch (error) {
    console.error('Failed to fetch popular tags:', error);
    throw error;
  }
}; 