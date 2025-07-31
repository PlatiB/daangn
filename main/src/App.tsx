import './App.css'

function App() {
  return (
    <div className="app">
      <div className="container">
        {/* CSS 변수 테스트 헤더 */}
        <header className="test-header">
          <h1 className="responsive-text">당근마켓 CSS 변수 테스트</h1>
          <p className="test-subtitle">CSS 변수와 반응형 시스템이 올바르게 작동하는지 확인합니다</p>
        </header>

        {/* 색상 팔레트 테스트 */}
        <section className="color-test">
          <h2>색상 팔레트 테스트</h2>
          <div className="color-grid">
            <div className="color-box primary">Primary Color</div>
            <div className="color-box secondary">Secondary Color</div>
            <div className="color-box text-primary">Text Primary</div>
            <div className="color-box text-secondary">Text Secondary</div>
          </div>
        </section>

        {/* 반응형 폰트 크기 테스트 */}
        <section className="font-test">
          <h2>반응형 폰트 크기 테스트 (clamp 함수)</h2>
          <p className="font-xs">Extra Small (clamp)</p>
          <p className="font-sm">Small (clamp)</p>
          <p className="font-base">Base (clamp)</p>
          <p className="font-lg">Large (clamp)</p>
          <p className="font-xl">Extra Large (clamp)</p>
          <p className="font-2xl">2X Large (clamp)</p>
        </section>

        {/* 반응형 그리드 테스트 */}
        <section className="grid-test">
          <h2>반응형 그리드 테스트</h2>
          <div className="responsive-grid">
            <div className="grid-item">Grid Item 1</div>
            <div className="grid-item">Grid Item 2</div>
            <div className="grid-item">Grid Item 3</div>
            <div className="grid-item">Grid Item 4</div>
          </div>
        </section>

        {/* 간격 시스템 테스트 */}
        <section className="spacing-test">
          <h2>간격 시스템 테스트</h2>
          <div className="spacing-demo">
            <div className="spacing-xs">XS Spacing</div>
            <div className="spacing-sm">SM Spacing</div>
            <div className="spacing-md">MD Spacing</div>
            <div className="spacing-lg">LG Spacing</div>
            <div className="spacing-xl">XL Spacing</div>
          </div>
        </section>

        {/* 반응형 상태 표시 */}
        <div className="responsive-info"></div>

        {/* CSS 변수 디버깅 정보 */}
        <div className="debug-info">
          <div>Primary: var(--primary-color)</div>
          <div>Font Base: var(--font-size-base)</div>
          <div>Spacing MD: var(--spacing-md)</div>
          <div>브라우저를 리사이즈해서 반응형 테스트</div>
        </div>
      </div>
    </div>
  )
}

export default App
