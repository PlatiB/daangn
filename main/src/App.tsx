import './App.css'
import Header from './components/Header/Header'
import HeroSection from './components/HeroSection/HeroSection'
import CategoryGrid from './components/CategoryGrid/CategoryGrid'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <HeroSection />
        <CategoryGrid />
        {/* 향후 PopularLocations 컴포넌트가 들어갈 영역 */}
      </main>
    </div>
  )
}

export default App
