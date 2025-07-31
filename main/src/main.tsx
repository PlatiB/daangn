import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// CSS 파일들을 올바른 순서로 import
import './styles/variables.css'  // CSS 변수 먼저 정의
import './styles/globals.css'    // 기본 스타일 및 Reset
import './styles/responsive.css' // 반응형 스타일
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
