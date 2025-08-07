import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Category } from '../../data/mockData';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
  isPremium?: boolean;
  delay?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isPremium = false,
  delay = 0
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/category/${category.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/category/${category.id}`);
    }
  };

  return (
    <div
      className={`category-card ${isPremium ? 'premium' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${category.name} 카테고리로 이동`}
    >
      <div className="card-icon" style={{ color: category.color }}>
        {category.iconPath ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <g dangerouslySetInnerHTML={{ __html: category.iconPath }} />
          </svg>
        ) : (
          category.icon
        )}
      </div>
      <span className="card-title">{category.name}</span>
      
      {/* 프리미엄 배지 조건부 렌더링 */}
      {isPremium && (
        <span className="premium-badge">Premium</span>
      )}
    </div>
  );
};

export default React.memo(CategoryCard); 