import './CategoryGridSkeleton.css';

function CategoryGridSkeleton() {
  return (
    <section className="category-grid-skeleton">
      {[1, 2, 3, 4, 5, 6, 7].map(num => (
        <div
          key={num}
          className="skeleton-card"
          aria-label={`카테고리 로딩 중 ${num}`}
        >
          <div className="skeleton-icon"></div>
          <div className="skeleton-title"></div>
        </div>
      ))}
    </section>
  );
}

export default CategoryGridSkeleton; 