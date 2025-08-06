import { useState, useEffect } from 'react';
import { categories as mockCategories } from '../../data/mockData';
import CategoryCard from './CategoryCard';
import CategoryGridSkeleton from './CategoryGridSkeleton';
import './CategoryGrid.css';

function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // 카테고리 데이터 로드
  useEffect(() => {
    // Mock API 호출 시뮬레이션
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 500);
  }, []);


  // 로딩 상태
  if (loading) {
    return <CategoryGridSkeleton />;
  }

  // 에러 상태 (현재는 발생하지 않음)
  if (error) {
    return (
      <div className="category-grid-error">
        <p className="error-message">오류가 발생했습니다.</p>
      </div>
    );
  }

  // 빈 데이터 상태
  if (categories.length === 0) {
    return (
      <div className="category-grid-empty">
        <p>표시할 카테고리가 없습니다.</p>
      </div>
    );
  }

  return (
    <section className="category-grid">
      {categories.map(category => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </section>
  );
}

export default CategoryGrid; 