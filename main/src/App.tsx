import './App.css'

function App() {
  return (
    <div className="app">
      <div className="container">
        {/* 메인 컨텐츠 영역 - 향후 컴포넌트들이 추가될 영역 */}
        <main className="main-content">
          <section className="welcome-section">
            <h1 className="responsive-text">당근마켓 클론</h1>
            <p className="subtitle">모바일 퍼스트 반응형 시스템 구축 완료</p>
          </section>

          {/* 반응형 테스트 데모 섹션 */}
          <section className="demo-section">
            <h2>반응형 시스템 데모</h2>
            <div className="responsive-grid">
              <div className="demo-card touch-target">
                <h3>모바일 우선</h3>
                <p>320px부터 시작하는 모바일 퍼스트 디자인</p>
              </div>
              <div className="demo-card touch-target">
                <h3>태블릿 대응</h3>
                <p>768px 이상에서 2열 그리드</p>
              </div>
              <div className="demo-card touch-target">
                <h3>데스크톱 대응</h3>
                <p>1024px 이상에서 4열 그리드</p>
              </div>
              <div className="demo-card touch-target">
                <h3>터치 친화적</h3>
                <p>최소 44px 터치 타겟</p>
              </div>
            </div>
          </section>
        </main>

        {/* 반응형 상태 표시기 */}
        <div className="responsive-indicator"></div>
      </div>
    </div>
  )
}

export default App
