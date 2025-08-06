import { useState, useEffect } from 'react';
import { fetchCategories } from '../../services/api';
import CategoryCard from './CategoryCard';
import CategoryGridSkeleton from './CategoryGridSkeleton';
import './CategoryGrid.css';

function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 카테고리 데이터 로드
  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => {
        setError('카테고리를 불러오는데 실패했습니다.');
        setLoading(false);
      });
  }, []);

  // 로딩 상태
  if (loading) {
    return <CategoryGridSkeleton />;
  }

  // 에러 상태
  if (error) {
    return (
      <div className="category-grid-error">
        <p className="error-message">{error}</p>
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