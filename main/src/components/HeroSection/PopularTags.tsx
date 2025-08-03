import './PopularTags.css';

/**
 * 원본 당근마켓 인기 검색어 태그 데이터
 */
const originalPopularTags = [
  '에어컨',
  '에어컨청소',
  '노트북',
  '원룸',
  '현대 중고차',
  '이사짐 알바',
  '근처 맛집',
  '투표',
  '동네친구',
  '배드민턴 모임',
  '자전거',
  '플스',
  '투룸 빌라',
  '닌텐도',
  '서빙 알바',
  '기아 중고차',
  '전세 매물'
];

/**
 * 인기 검색어 태그 컴포넌트
 * 원본 당근마켓 스타일의 인기 검색어 태그 목록
 */
function PopularTags({ onTagClick }) {
  // 태그 클릭 핸들러
  const handleTagClick = (tag) => {
    console.log('태그 클릭:', tag);
    onTagClick?.(tag);
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (event, tag) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTagClick(tag);
    }
  };

  return (
    <div className="popular-tags">
      <div className="popular-tags-container">
        <ul className="tags-list">
          {/* 제목을 첫 번째 li로 이동하여 함께 스와이프되도록 함 */}
          <li className="tag-item title-item">
            <span className="tags-title">인기 검색어</span>
          </li>
          {originalPopularTags.map((tag, index) => (
            <li key={`${tag}-${index}`} className="tag-item">
              <button
                className="tag-link"
                onClick={() => handleTagClick(tag)}
                onKeyDown={(e) => handleKeyDown(e, tag)}
                aria-label={`${tag} 검색하기`}
                tabIndex={0}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* 좌우 페이드 효과 - 태블릿에서만 표시 */}
      <div className="fade-left"></div>
      <div className="fade-right"></div>
    </div>
  );
}

export default PopularTags; 