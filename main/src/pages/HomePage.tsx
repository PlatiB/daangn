import HeroSection from '../components/HeroSection/HeroSection.jsx';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid.jsx';

function HomePage() {
  return (
    <main className="main-content">
      <HeroSection />
      <CategoryGrid />
      {/* 향후 PopularLocations 컴포넌트가 들어갈 영역 */}
    </main>
  );
}

export default HomePage; 