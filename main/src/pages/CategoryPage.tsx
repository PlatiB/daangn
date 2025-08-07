import { useParams, Link } from 'react-router-dom';
import { buySellItems } from '../data/mockData';
import './CategoryPage.css';

function CategoryPage() {
  const { categoryId } = useParams();

  // 중고거래 카테고리인 경우 특별한 페이지 표시
  if (categoryId === 'buy-sell') {
    return (
      <main className="main-content">
        <div className="category-page">
          <div className="category-header">
            <Link to="/" className="back-link">← 홈으로 돌아가기</Link>
            <h1 className="category-title">중고거래</h1>
            <p className="category-description">정자동 근처의 중고거래 상품들을 찾아보세요</p>
          </div>
          
          <div className="buy-sell-items">
            {buySellItems.map((item) => (
              <div key={item.id} className="buy-sell-item">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-info">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-price">{item.price.toLocaleString()}원</p>
                  <p className="item-location">{item.location}</p>
                  <p className="item-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // 다른 카테고리들은 기본 페이지 표시
  return (
    <main className="main-content">
      <div className="category-page">
        <div className="category-header">
          <Link to="/" className="back-link">← 홈으로 돌아가기</Link>
          <h1 className="category-title">카테고리: {categoryId}</h1>
          <p className="category-description">이 카테고리의 콘텐츠가 여기에 표시됩니다.</p>
        </div>
      </div>
    </main>
  );
}

export default CategoryPage; 