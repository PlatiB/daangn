import React from 'react';
import './CategoryGridSkeleton.css';

const CategoryGridSkeleton: React.FC = () => {
  return (
    <section className="category-grid-skeleton">
      {Array.from({ length: 7 }, (_, index) => (
        <div 
          key={index} 
          className="skeleton-card"
          aria-label={`카테고리 로딩 중 ${index + 1}`}
        >
          <div className="skeleton-icon"></div>
          <div className="skeleton-title"></div>
        </div>
      ))}
    </section>
  );
};

export default CategoryGridSkeleton; 