import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <main className="main-content">
      <div className="not-found-page">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">페이지를 찾을 수 없습니다</h2>
        <p className="not-found-description">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link to="/" className="home-link">
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage; 