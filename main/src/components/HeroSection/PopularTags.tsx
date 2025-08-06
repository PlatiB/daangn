import { useState, useEffect } from 'react';
import { fetchPopularTagsWithAxios } from '../../services/api';
import './PopularTags.css';

/**
 * 인기 검색어 태그 컴포넌트
 * 원본 당근마켓 스타일의 인기 검색어 태그 목록
 */
function PopularTags({ onTagClick }) {
  const [popularTags, setPopularTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API에서 인기 태그 데이터 로드 (Axios 사용)
  useEffect(() => {
    setLoading(true);
    fetchPopularTagsWithAxios()
      .then(data => {
        setPopularTags(data);
        setLoading(false);
      })
      .catch((error) => {
        // axios 에러 처리로 더 구체적인 에러 메시지 제공
        setError(error.message || '인기 검색어를 불러오는데 실패했습니다.');
        setLoading(false);
      });
  }, []);

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

  // 로딩 상태
  if (loading) {
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

  // 에러 상태
  if (error) {
    return (
      <div className="popular-tags">
        <div className="popular-tags-container">
          <ul className="tags-list">
            <li className="tag-item title-item">
              <span className="tags-title">인기 검색어</span>
            </li>
            <li className="tag-item error-item">
              <span>{error}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="popular-tags">
      <div className="popular-tags-container">
        <ul className="tags-list">
          {/* 제목을 첫 번째 li로 이동하여 함께 스와이프되도록 함 */}
          <li className="tag-item title-item">
            <span className="tags-title">인기 검색어</span>
          </li>
          {popularTags.map((tag, index) => (
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