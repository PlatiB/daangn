import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Category } from '../../data/mockData';
import { categories as mockCategories } from '../../data/mockData';
import CategoryCard from './CategoryCard';
import CategoryGridSkeleton from './CategoryGridSkeleton';
import './CategoryGrid.css';

interface CategoryGridProps {
  userRole?: 'guest' | 'member' | 'premium';
  maxItems?: number;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  userRole = 'guest', 
  maxItems 
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // 권한에 따른 카테고리 필터링
  const filteredCategories = useMemo(() => {
    const filtered = categories.filter(category => {
      if (!category.permission || category.permission === 'public') return true;
      if (userRole === 'premium') return true;
      if (userRole === 'member' && category.permission !== 'premium') return true;
      return false;
    });
    
    // 디바이스별 표시 개수 제한
    return maxItems ? filtered.slice(0, maxItems) : filtered;
  }, [categories, userRole, maxItems]);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 에러 시뮬레이션 (재시도 테스트용)
      if (retryCount === 0 && Math.random() < 0.3) {
        throw new Error('네트워크 오류가 발생했습니다.');
      }
      
      setCategories(mockCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchCategories();
  };

  // 로딩 상태
  if (loading) {
    return <CategoryGridSkeleton />;
  }

  // 에러 상태
  if (error) {
    return (
      <div className="category-grid-error">
        <p className="error-message">{error}</p>
        <button onClick={handleRetry} className="retry-button">
          다시 시도
        </button>
      </div>
    );
  }

  // 빈 데이터 상태
  if (filteredCategories.length === 0) {
    return (
      <div className="category-grid-empty">
        <p>표시할 카테고리가 없습니다.</p>
        {userRole === 'guest' && (
          <p className="upgrade-message">
            회원가입하시면 더 많은 카테고리를 이용하실 수 있습니다.
          </p>
        )}
      </div>
    );
  }

  return (
    <section className="category-grid">
      {filteredCategories.map((category, index) => (
        <CategoryCard 
          key={category.id} 
          category={category}
          isPremium={category.permission === 'premium'}
          delay={index * 100} // 순차적 애니메이션
        />
      ))}
    </section>
  );
};

export default CategoryGrid; 