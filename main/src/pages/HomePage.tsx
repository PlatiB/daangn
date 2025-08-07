import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategoryGrid } from '../components/CategoryGrid';

const HomePage: React.FC = () => {
  return (
    <main className="main-content">
      <HeroSection />
      <CategoryGrid userRole="premium" />
      {/* 향후 PopularLocations 컴포넌트가 들어갈 영역 */}
    </main>
  );
};

export default HomePage; 