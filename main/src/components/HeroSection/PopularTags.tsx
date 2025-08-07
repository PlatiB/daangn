import { useAppContext } from '../../contexts';
import './PopularTags.css';

/**
 * 인기 검색어 태그 컴포넌트
 * 원본 당근마켓 스타일의 인기 검색어 태그 목록
 */
function PopularTags({ onTagClick }) {
  const { state } = useAppContext();

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

  // 로딩 상태 (Context에서 관리)
  if (state.loading && state.popularTags.length === 0) {
    return (
      <div className="popular-tags">
        <div className="popular-tags-container">
          <ul className="tags-list">
            <li className="tag-item title-item">
              <span className="tags-title">인기 검색어</span>
            </li>
            <li className="tag-item loading-item">
              <span>인기 검색어를 불러오는 중...</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // 데이터가 없으면 아무것도 렌더링하지 않음
  if (!state.popularTags || state.popularTags.length === 0) {
    return null;
  }

  return (
    <div className="popular-tags">
      <div className="popular-tags-container">
        <ul className="tags-list">
          {/* 제목을 첫 번째 li로 이동하여 함께 스와이프되도록 함 */}
          <li className="tag-item title-item">
            <span className="tags-title">인기 검색어</span>
          </li>
          {state.popularTags.map((tag, index) => (
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