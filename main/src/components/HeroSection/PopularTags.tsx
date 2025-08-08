import React, { memo } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { selectPopularTags, selectCategoryLoading } from '../../store/selectors';
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
  const popularTags = useAppSelector(selectPopularTags);
  const loading = useAppSelector(selectCategoryLoading);

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

  // 로딩 상태 (Redux에서 관리)
  if (loading && popularTags.length === 0) {
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

  // 데이터가 없으면 아무것도 렌더링하지 않음
  if (popularTags.length === 0) {
    return null;
  }

  return (
    <div className={`popular-tags ${className}`.trim()}>
      <div className="popular-tags-container">
        <ul className="tags-list">
          {/* 제목을 첫 번째 li로 이동하여 함께 스와이프되도록 함 */}
          <li className="tag-item title-item">
            <span className="tags-title">인기 검색어</span>
          </li>
          {popularTags.map((tag: string, index: number) => (
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

export default memo(PopularTags); 