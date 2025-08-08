import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { Header } from './components/Header'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import NotFoundPage from './pages/NotFoundPage'
import AppInitializer from './components/AppInitializer'

function App() {
  return (
    <Provider store={store}>
      <AppInitializer>
        <BrowserRouter>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AppInitializer>
    </Provider>
  )
}

export default App
