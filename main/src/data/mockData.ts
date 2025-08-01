// 당근마켓 클론 프로젝트의 Mock 데이터

// 지역 데이터 타입 정의
export interface Location {
  id: string;
  name: string;
  code: string;
  district?: string;        // 구/군 정보
  popular?: boolean;        // 인기 지역 여부
  parentCode?: string;      // 상위 지역 코드
}

// 카테고리 데이터 타입 정의
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  href: string;
  color: string;
}

// 현재 선택된 지역
export const currentLocation: Location = {
  id: '1339',
  name: '정자동',
  code: '1339'
};

// 지역 목록 데이터 (서울 및 수도권 주요 지역 25개)
export const locations: Location[] = [
  // 성남/분당권 (현재 지역)
  { id: '1339', name: '정자동', code: '1339', district: '분당구', popular: true },
  { id: '1340', name: '분당구', code: '1340', district: '성남시', popular: true },
  { id: '1342', name: '판교역', code: '1342', district: '분당구', popular: true },
  { id: '1343', name: '서현역', code: '1343', district: '분당구', popular: true },
  
  // 용인권
  { id: '1344', name: '수지구', code: '1344', district: '용인시', popular: true },
  { id: '1346', name: '기흥구', code: '1346', district: '용인시' },
  { id: '1347', name: '광교', code: '1347', district: '영통구' },
  
  // 서울 강남권
  { id: '2001', name: '역삼동', code: '2001', district: '강남구', popular: true },
  { id: '2002', name: '논현동', code: '2002', district: '강남구', popular: true },
  { id: '2003', name: '삼성동', code: '2003', district: '강남구' },
  { id: '2004', name: '청담동', code: '2004', district: '강남구' },
  { id: '2005', name: '서초동', code: '2005', district: '서초구', popular: true },
  { id: '2006', name: '반포동', code: '2006', district: '서초구' },
  { id: '2007', name: '방배동', code: '2007', district: '서초구' },
  
  // 서울 강동/송파권
  { id: '2008', name: '잠실동', code: '2008', district: '송파구', popular: true },
  { id: '2009', name: '문정동', code: '2009', district: '송파구' },
  { id: '2010', name: '천호동', code: '2010', district: '강동구' },
  
  // 서울 서북권
  { id: '2011', name: '홍대', code: '2011', district: '마포구', popular: true },
  { id: '2012', name: '합정동', code: '2012', district: '마포구' },
  { id: '2013', name: '상암동', code: '2013', district: '마포구' },
  { id: '2014', name: '여의도동', code: '2014', district: '영등포구' },
  
  // 서울 중심권
  { id: '2015', name: '한남동', code: '2015', district: '용산구' },
  { id: '2016', name: '이태원동', code: '2016', district: '용산구' },
  { id: '2017', name: '명동', code: '2017', district: '중구' },
  { id: '2018', name: '신림동', code: '2018', district: '관악구' },
  
  // 경기권
  { id: '3001', name: '일산동구', code: '3001', district: '고양시' },
  { id: '3002', name: '부천역', code: '3002', district: '부천시' }
];

// 카테고리 데이터
export const categories: Category[] = [
  {
    id: 'buy-sell',
    name: '중고거래',
    icon: '🛍️',
    description: '믿을만한 이웃 간 중고거래',
    href: '/kr/buy-sell',
    color: '#FF6F0F'
  },
  {
    id: 'jobs',
    name: '알바',
    icon: '💼',
    description: '내 근처 알바 찾기',
    href: '/kr/jobs',
    color: '#0ACF83'
  },
  {
    id: 'realty',
    name: '부동산',
    icon: '🏠',
    description: '내 근처 매물 찾기',
    href: '/kr/realty',
    color: '#1E90FF'
  },
  {
    id: 'cars',
    name: '중고차',
    icon: '🚗',
    description: '믿을만한 중고차 거래',
    href: '/kr/cars',
    color: '#FF4757'
  },
  {
    id: 'business',
    name: '동네업체',
    icon: '🏪',
    description: '우리동네 업체 찾기',
    href: '/kr/business',
    color: '#A55EEA'
  },
  {
    id: 'community',
    name: '동네생활',
    icon: '🏘️',
    description: '동네 이웃들과 소통',
    href: '/kr/community',
    color: '#26C6DA'
  },
  {
    id: 'groups',
    name: '모임',
    icon: '👥',
    description: '관심사가 비슷한 이웃들과',
    href: '/kr/groups',
    color: '#FFA726'
  }
];

// 인기 검색어 데이터
export const popularTags: string[] = [
  '아이폰',
  '삼성 갤럭시',
  '에어팟',
  '맥북',
  '아이패드',
  '닌텐도 스위치',
  '플레이스테이션',
  '자전거',
  '운동화',
  '가방'
];

// 동적 키워드 애니메이션용 데이터 (HeroSection 전용)
export const animatedKeywords: string[] = [
  '동네친구',
  '맛집',
  '중고거래',
  '알바'
];