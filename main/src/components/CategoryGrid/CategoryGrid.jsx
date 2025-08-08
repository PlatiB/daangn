// CategoryGrid 컴포넌트 - 간결한 Redux 버전
// selector 없이 직접 state 접근

import { useSelector } from 'react-redux';
import CategoryCard from './CategoryCard';
import CategoryGridSkeleton from './CategoryGridSkeleton';
import './CategoryGrid.css';

function CategoryGrid() {
  // Redux store에서 직접 데이터 가져오기 (selector 없이)
  const categories = useSelector(state => state.category.categories);
  const loading = useSelector(state => state.category.loading);

  // 로딩 상태
  if (loading && categories.length === 0) {
    return <CategoryGridSkeleton />;
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
    <div className="category-grid-container">
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;