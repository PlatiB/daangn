// 유틸리티 헬퍼 함수들

/**
 * 디바운스 함수
 * @param func 실행할 함수
 * @param delay 지연 시간 (밀리초)
 * @returns 디바운스된 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * 스로틀 함수
 * @param func 실행할 함수
 * @param delay 지연 시간 (밀리초)
 * @returns 스로틀된 함수
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

/**
 * 클래스명 조건부 연결 함수
 * @param classes 클래스명 객체
 * @returns 연결된 클래스명 문자열
 */
export function classNames(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 로컬 스토리지 헬퍼
 */
export const localStorage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }
};

/**
 * 디바이스 타입 감지
 */
export const device = {
  isMobile: (): boolean => window.innerWidth < 768,
  isTablet: (): boolean => window.innerWidth >= 768 && window.innerWidth < 1024,
  isDesktop: (): boolean => window.innerWidth >= 1024,
  isTouchDevice: (): boolean => 'ontouchstart' in window || navigator.maxTouchPoints > 0
};

/**
 * 포맷 유틸리티
 */
export const format = {
  currency: (amount: number): string => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  },

  number: (num: number): string => {
    return new Intl.NumberFormat('ko-KR').format(num);
  },

  relativeTime: (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return '오늘';
    if (days === 1) return '어제';
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    if (days < 365) return `${Math.floor(days / 30)}개월 전`;
    return `${Math.floor(days / 365)}년 전`;
  }
};