import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      
      <main className="main" id="main-content">
        <HeroSection />
        <CategoryGrid />
      </main>
    </div>
  );
};

export default App;