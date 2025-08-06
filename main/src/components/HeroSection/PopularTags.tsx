import React, { memo, useState, useEffect, useCallback } from 'react';
import { fetchPopularTags } from '../../services/api';
import './PopularTags.css';

/**
 * PopularTags 컴포넌트의 Props 인터페이스
 */
export interface PopularTagsProps {
  /** 태그 클릭 시 호출되는 콜백 함수 */
  onTagClick?: (tag: string) => void;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * 인기 검색어 태그 컴포넌트
 * 원본 당근마켓 스타일의 인기 검색어 태그 목록
 */
const PopularTags: React.FC<PopularTagsProps> = ({
  onTagClick,
  className = ''
}) => {
  // State
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API에서 인기 태그 데이터 로드
  const loadPopularTags = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTags = await fetchPopularTags();
      setPopularTags(fetchedTags);
    } catch (err) {
      setError(err instanceof Error ? err.message : '인기 검색어를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  // 컴포넌트 마운트 시 인기 태그 데이터 로드
  useEffect(() => {
    loadPopularTags();
  }, [loadPopularTags]);

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    console.log('태그 클릭:', tag);
    onTagClick?.(tag);
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (event: React.KeyboardEvent, tag: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTagClick(tag);
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className={`popular-tags ${className}`.trim()}>
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
      <div className={`popular-tags ${className}`.trim()}>
        <div className="popular-tags-container">
          <ul className="tags-list">
            <li className="tag-item title-item">
              <span className="tags-title">인기 검색어</span>
            </li>
            <li className="tag-item error-item">
              <span>{error}</span>
              <button onClick={loadPopularTags} className="retry-button">
                다시 시도
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`popular-tags ${className}`.trim()}>
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
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default memo(PopularTags); 