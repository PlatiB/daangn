import './CategoryCard.css';

function CategoryCard({ category }) {
  return (
    <a
      href={category.href}
      className="category-card"
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
      
    </a>
  );
}

export default CategoryCard; 