import './App.css'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection/HeroSection'

function App() {
  return (
    <div className="app">
      {/* Header 컴포넌트 */}
      <Header />
      
      {/* 메인 컨텐츠 영역 */}
      <main className="main-content">
        {/* HeroSection 컴포넌트 */}
        <HeroSection />
        
        {/* 향후 PopularTags 컴포넌트가 들어갈 영역 */}
        
        {/* 향후 CategoryGrid 컴포넌트가 들어갈 영역 */}
        
        {/* 향후 PopularLocations 컴포넌트가 들어갈 영역 */}
      </main>
    </div>
  )
}

export default App
