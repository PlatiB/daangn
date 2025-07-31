// 당근마켓 클론 프로젝트의 Mock 데이터

// 지역 데이터 타입 정의
export interface Location {
  id: string;
  name: string;
  code: string;
  parentCode?: string;
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

// 지역 목록 데이터
export const locations: Location[] = [
  { id: '1339', name: '정자동', code: '1339' },
  { id: '1340', name: '분당구', code: '1340' },
  { id: '1341', name: '성남시', code: '1341' },
  { id: '1342', name: '판교역', code: '1342' },
  { id: '1343', name: '서현역', code: '1343' },
  { id: '1344', name: '수지구', code: '1344' },
  { id: '1345', name: '용인시', code: '1345' },
  { id: '1346', name: '기흥구', code: '1346' },
  { id: '1347', name: '광교', code: '1347' },
  { id: '1348', name: '영통구', code: '1348' }
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

// 동적 키워드 애니메이션용 데이터
export const animatedKeywords: string[] = [
  '동네친구',
  '맛집',
  '중고거래',
  '알바',
  '부동산',
  '중고차',
  '동네업체'
];