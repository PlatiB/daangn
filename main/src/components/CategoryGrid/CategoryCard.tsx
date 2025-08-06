import React from 'react';
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
  return (
    <a
      href={category.href}
      className={`category-card ${isPremium ? 'premium' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
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
    </a>
  );
};

export default React.memo(CategoryCard); 