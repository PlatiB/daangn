import React, { useMemo } from 'react';
import CategoryCard from './CategoryCard';
import CategoryGridSkeleton from './CategoryGridSkeleton';
import { useAppSelector } from '../../hooks/redux';
import { selectCategories, selectCategoryLoading } from '../../store/selectors';
import './CategoryGrid.css';

interface CategoryGridProps {
  userRole?: 'guest' | 'member' | 'premium';
  maxItems?: number;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  userRole = 'guest', 
  maxItems 
}) => {
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoryLoading);
  
  // 권한에 따른 카테고리 필터링
  const filteredCategories = useMemo(() => {
    const filtered = categories.filter((category: any) => {
      if (!category.permission || category.permission === 'public') return true;
      if (userRole === 'premium') return true;
      if (userRole === 'member' && category.permission !== 'premium') return true;
      return false;
    });
    
    // 디바이스별 표시 개수 제한
    return maxItems ? filtered.slice(0, maxItems) : filtered;
  }, [categories, userRole, maxItems]);

  // 로딩 상태 (Redux에서 관리)
  if (loading && categories.length === 0) {
    return <CategoryGridSkeleton />;
  }

  // 데이터가 없으면 아무것도 렌더링하지 않음
  if (categories.length === 0) {
    return null;
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
                {filteredCategories.map((category: any, index: number) => (
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