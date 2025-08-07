import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

function CategoryCard({ category }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/category/${category.id}`);
  };

  return (
    <div
      className="category-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
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
    </div>
  );
}

export default CategoryCard; 