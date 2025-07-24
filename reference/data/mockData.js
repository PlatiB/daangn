// 🥕 당근마켓 클론 코딩 실습용 더미 데이터
// 실습자들은 이 데이터를 사용하여 일관된 결과물을 만들 수 있습니다.

export const categories = [
  {
    id: 'buy-sell',
    name: '중고거래',
    href: '/kr/buy-sell',
    color: '#FF6F0F',
    iconPath: 'M9.84309 4.75124C9.36967 4.95223 9.14891 5.49889 9.35001 5.97226L12.2977 12.9108C12.4988 13.3841 13.0456 13.6049 13.519 13.404L20.0229 10.6428C20.4963 10.4419 20.7171 9.89519 20.516 9.42182L17.5683 2.48332C17.3672 2.00995 16.8204 1.78915 16.347 1.99013L9.84309 4.75124Z'
  },
  {
    id: 'jobs',
    name: '알바',
    href: '/kr/jobs',
    color: '#FF9000',
    iconPath: 'M11.1086 5.34729C9.0989 5.34729 7.45435 6.96639 7.45435 8.9726C7.45435 10.9788 9.0989 12.5979 11.1086 12.5979C13.1183 12.5979 14.7629 10.9788 14.7629 8.9726C14.7629 6.96639 13.1183 5.34729 11.1086 5.34729Z'
  },
  {
    id: 'realty',
    name: '부동산',
    href: '/kr/realty',
    color: '#DF5BC2',
    iconPath: 'M13.471 1.91589C12.5651 1.36111 11.4246 1.36139 10.519 1.91661L2.46422 6.85498C2.16026 7.04134 1.97498 7.37227 1.97498 7.72882V19.475C1.97498 21.1457 3.32931 22.5 4.99998 22.5H19C20.6706 22.5 22.025 21.1457 22.025 19.475V7.72882C22.025 7.37209 21.8395 7.04102 21.5353 6.85471L13.471 1.91589Z'
  },
  {
    id: 'cars',
    name: '중고차',
    href: '/kr/cars',
    color: '#318EFF',
    iconPath: 'M2.01535 9.60315C2.02977 9.56388 2.04637 9.52498 2.06519 9.48659L4.54039 4.43914L4.5413 4.43728C5.09673 3.29738 6.25013 2.5957 7.49862 2.5957H16.3862C17.6441 2.5957 18.7774 3.3049 19.3386 4.4274L19.3415 4.43321L21.5921 8.99582L21.9141 9.78794C22.575 11.7837 23.4131 14.2718 23.3392 16.8895Z'
  },
  {
    id: 'local-profile',
    name: '동네업체',
    href: '/kr/local-profile',
    color: '#FFAA00',
    iconPath: 'M4.87147 1.80005C3.75963 1.80005 2.76062 2.47927 2.35175 3.5132L0.654074 7.80617C0.543575 8.0856 0.578202 8.40156 0.746595 8.65042L0.774671 8.69073C0.789641 8.7118 0.810213 8.74021 0.83622 8.77493Z'
  },
  {
    id: 'community',
    name: '동네생활',
    href: '/kr/community',
    color: '#00C7BE',
    iconPath: 'M19.5007 1.80064C14.5335 1.79933 9.5663 1.79974 4.59926 1.80064C3.05305 1.80091 1.79978 3.05448 1.7998 4.60067L1.80008 19.4999C1.80011 21.0462 3.05371 22.2998 4.60009 22.2998H19.4998Z'
  },
  {
    id: 'group',
    name: '모임',
    href: '/kr/group',
    color: '#FF6F0F',
    iconPath: 'M13.7157 6.66349C13.7157 5.11738 14.9653 3.86786 16.5113 3.86786C18.0573 3.86786 19.3069 5.11738 19.3069 6.66349C19.3069 8.2096 18.0573 9.45912 16.5113 9.45912Z'
  }
];

export const popularTags = [
  { name: '에어컨', href: '/kr/buy-sell?search=에어컨', category: 'buy-sell' },
  { name: '에어컨청소', href: '/kr/local-profile?search=에어컨청소', category: 'local-profile' },
  { name: '노트북', href: '/kr/buy-sell?search=노트북', category: 'buy-sell' },
  { name: '원룸', href: '/kr/realty?salesType=one_room', category: 'realty' },
  { name: '현대 중고차', href: '/kr/cars?company=1', category: 'cars' },
  { name: '이사짐 알바', href: '/kr/jobs?search=이사짐', category: 'jobs' },
  { name: '근처 맛집', href: '/kr/local-profile?search=맛집', category: 'local-profile' },
  { name: '투표', href: '/kr/community?search=투표', category: 'community' },
  { name: '동네친구', href: '/kr/community?search=동네친구', category: 'community' },
  { name: '배드민턴 모임', href: '/kr/group?search=배드민턴', category: 'group' },
  { name: '자전거', href: '/kr/buy-sell?search=자전거', category: 'buy-sell' },
  { name: '플스', href: '/kr/buy-sell?search=플스', category: 'buy-sell' },
  { name: '투룸 빌라', href: '/kr/realty?salesType=two_room', category: 'realty' },
  { name: '닌텐도', href: '/kr/buy-sell?search=닌텐도', category: 'buy-sell' },
  { name: '서빙 알바', href: '/kr/jobs?tasks=SERVING', category: 'jobs' },
  { name: '기아 중고차', href: '/kr/cars?company=2', category: 'cars' },
  { name: '전세 매물', href: '/kr/realty?tradeType=borrow', category: 'realty' }
];

export const popularLocations = [
  { name: '송도동', code: '6543', href: '/kr?in=송도동-6543' },
  { name: '역삼동', code: '6035', href: '/kr?in=역삼동-6035' },
  { name: '물금읍', code: '3662', href: '/kr?in=물금읍-3662' },
  { name: '봉담읍', code: '1766', href: '/kr?in=봉담읍-1766' },
  { name: '배방읍', code: '2333', href: '/kr?in=배방읍-2333' },
  { name: '서초동', code: '6128', href: '/kr?in=서초동-6128' },
  { name: '옥정동', code: '4656', href: '/kr?in=옥정동-4656' },
  { name: '신림동', code: '355', href: '/kr?in=신림동-355' },
  { name: '불당동', code: '2292', href: '/kr?in=불당동-2292' },
  { name: '향남읍', code: '1768', href: '/kr?in=향남읍-1768' },
  { name: '청담동', code: '386', href: '/kr?in=청담동-386' },
  { name: '다산동', code: '4470', href: '/kr?in=다산동-4470' },
  { name: '별내동', code: '1604', href: '/kr?in=별내동-1604' },
  { name: '화도읍', code: '1590', href: '/kr?in=화도읍-1590' },
  { name: '다사읍', code: '817', href: '/kr?in=다사읍-817' },
  { name: '마곡동', code: '6052', href: '/kr?in=마곡동-6052' },
  { name: '압구정동', code: '385', href: '/kr?in=압구정동-385' },
  { name: '배곧동', code: '4245', href: '/kr?in=배곧동-4245' },
  { name: '고덕동', code: '11139', href: '/kr?in=고덕동-11139' },
  { name: '오창읍', code: '2134', href: '/kr?in=오창읍-2134' }
];

// 동적 텍스트용 키워드 배열
export const animatedKeywords = [
  '동네친구',
  '맛집',
  '중고거래',
  '알바',
  '부동산',
  '중고차',
  '동네업체'
];

// 현재 지역 정보 (실제로는 사용자 위치 기반으로 동적 설정)
export const currentLocation = {
  name: '정자동',
  code: '1339',
  fullName: '경기 성남시 분당구 정자동'
};

// 기본 검색 설정
export const defaultSearchConfig = {
  placeholder: '검색어를 입력해주세요',
  categories: ['중고거래', '알바', '부동산', '중고차', '동네업체', '동네생활', '모임'],
  defaultCategory: '중고거래'
};

// 반응형 브레이크포인트
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px'
};

// 컬러 팔레트
export const colors = {
  primary: '#FF6F0F',
  secondary: '#FF9F30',
  background: '#FFFFFF',
  text: '#212529',
  textMuted: '#6C757D',
  border: '#DEE2E6',
  neutral: '#F8F9FA'
};

// 컴포넌트별 스타일 가이드
export const styleGuide = {
  heroSection: {
    titleFontSize: { mobile: '24px', desktop: '32px' },
    titleFontWeight: 'bold',
    searchBarHeight: '56px',
    searchBarBorderRadius: '28px'
  },
  categoryGrid: {
    gridColumns: { mobile: 1, tablet: 2, desktop: 4 },
    itemPadding: '16px',
    itemBorderRadius: '12px',
    iconSize: '24px'
  },
  popularTags: {
    tagPadding: '8px 16px',
    tagBorderRadius: '20px',
    tagFontSize: '14px',
    scrollBehavior: 'smooth'
  },
  popularLocations: {
    locationPadding: '10px 20px',
    locationBorderRadius: '24px',
    locationFontSize: '14px',
    locationGap: '8px'
  }
};

// 애니메이션 설정
export const animations = {
  textRotation: {
    duration: 3000, // 3초마다 변경
    ease: 'ease-in-out'
  },
  hoverScale: {
    scale: 1.05,
    duration: 200
  },
  fadeIn: {
    duration: 300,
    ease: 'ease-out'
  }
}; 