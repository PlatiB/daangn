import CategoryCard from './CategoryCard';
import CategoryGridSkeleton from './CategoryGridSkeleton';
import { useAppContext } from '../../contexts';
import './CategoryGrid.css';

function CategoryGrid() {
  const { state } = useAppContext();

  // 로딩 상태
  if (state.loading && state.categories.length === 0) {
    return <CategoryGridSkeleton />;
  }

  // 빈 데이터 상태
  if (state.categories.length === 0) {
    return (
      <div className="category-grid-empty">
        <p>표시할 카테고리가 없습니다.</p>
      </div>
    );
  }

  return (
    <section className="category-grid">
      {state.categories.map(category => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </section>
  );
}

export default CategoryGrid;