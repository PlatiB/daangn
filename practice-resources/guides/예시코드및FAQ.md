# 🔧 예시 코드 및 FAQ

## 📋 개요
실습 중 자주 발생하는 질문과 참고할 수 있는 예시 코드를 정리했습니다.  
**완전한 정답이 아닌 참고용**으로 활용하세요!

---

## 🎯 1. HeroSection 컴포넌트 예시

### 기본 구조
```jsx
// components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { animatedKeywords, currentLocation } from '../data/mockData';

const HeroSection = () => {
  const [currentKeyword, setCurrentKeyword] = useState(0);

  // 3초마다 키워드 변경
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentKeyword(prev => (prev + 1) % animatedKeywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-title">
        <h1>
          {currentLocation.name}에서{' '}
          <span className="animated-text">
            {animatedKeywords[currentKeyword]}
          </span>{' '}
          찾고 계신가요?
        </h1>
      </div>
      
      <div className="search-container">
        <SearchForm />
      </div>
    </section>
  );
};

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('중고거래');

  return (
    <form className="search-form">
      <select 
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        <option value="중고거래">중고거래</option>
        <option value="알바">알바</option>
        <option value="부동산">부동산</option>
      </select>
      
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  );
};

export default HeroSection;
```

### CSS (Styled-Components 예시)
```jsx
import styled from 'styled-components';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const HeroTitle = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.4;
    
    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
  
  .animated-text {
    color: #FF6F0F;
    transition: opacity 0.3s ease;
  }
`;
```

---

## 📱 2. CategoryGrid 컴포넌트 예시

### 반응형 그리드 구현
```jsx
// components/CategoryGrid.jsx
import React from 'react';
import { categories } from '../data/mockData';

const CategoryGrid = () => {
  return (
    <section className="category-grid">
      <div className="grid-container">
        {categories.map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

const CategoryItem = ({ category }) => {
  return (
    <a href={category.href} className="category-item">
      <div className="icon-container" style={{ backgroundColor: category.color + '20' }}>
        <CategoryIcon iconPath={category.iconPath} color={category.color} />
      </div>
      <span className="category-name">{category.name}</span>
    </a>
  );
};

const CategoryIcon = ({ iconPath, color }) => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path d={iconPath} fill={color} />
  </svg>
);

export default CategoryGrid;
```

### CSS Grid 레이아웃
```css
.category-grid {
  padding: 2rem 1rem;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background: #fff;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.category-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

---

## 🏷️ 3. 자주 하는 실수들

### ❌ 실수 1: 무한 렌더링
```jsx
// 잘못된 코드
const Component = () => {
  const [data, setData] = useState([]);
  
  // useEffect에 dependency array 누락
  useEffect(() => {
    setData(mockData);
  }); // ← 이렇게 하면 무한 렌더링!
  
  return <div>{data.map(...)}</div>;
};
```

```jsx
// 올바른 코드
const Component = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setData(mockData);
  }, []); // ← 빈 배열 추가!
  
  return <div>{data.map(...)}</div>;
};
```

### ❌ 실수 2: Key prop 누락
```jsx
// 잘못된 코드
{items.map(item => <div>{item.name}</div>)}

// 올바른 코드
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

### ❌ 실수 3: CSS 클래스명 오타
```jsx
// 잘못된 코드
<div className="serach-container"> {/* serach ← 오타! */}

// 올바른 코드
<div className="search-container">
```

### ❌ 실수 4: 이벤트 핸들러 즉시 실행
```jsx
// 잘못된 코드
<button onClick={handleClick()}> {/* 즉시 실행됨! */}

// 올바른 코드
<button onClick={handleClick}> {/* 함수 참조 전달 */}
// 또는
<button onClick={() => handleClick()}> {/* 화살표 함수 사용 */}
```

---

## 📱 4. 반응형 디자인 팁

### 모바일 우선 접근법
```css
/* 기본: 모바일 스타일 */
.container {
  padding: 1rem;
  font-size: 14px;
}

/* 태블릿 이상 */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 16px;
  }
}

/* 데스크톱 이상 */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    font-size: 18px;
  }
}
```

### Flexbox vs Grid 선택 기준
```css
/* 1차원 레이아웃 → Flexbox */
.horizontal-list {
  display: flex;
  gap: 1rem;
  overflow-x: auto; /* 가로 스크롤 */
}

/* 2차원 레이아웃 → Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

---

## 🔧 5. 성능 최적화 팁

### React.memo 활용
```jsx
// 불필요한 리렌더링 방지
const CategoryItem = React.memo(({ category }) => {
  return (
    <div className="category-item">
      {/* 컴포넌트 내용 */}
    </div>
  );
});
```

### 이미지 최적화
```jsx
// lazy loading 적용
<img 
  src={category.icon} 
  alt={category.name}
  loading="lazy"
  width={24}
  height={24}
/>
```

---

## ❓ 6. 자주 묻는 질문 (FAQ)

### Q1: 동적 텍스트 애니메이션이 작동하지 않아요
**A:** useEffect의 dependency array를 확인하세요.
```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentKeyword(prev => (prev + 1) % keywords.length);
  }, 3000);
  
  return () => clearInterval(interval); // cleanup 필수!
}, []); // 빈 배열 필수!
```

### Q2: CSS가 적용되지 않아요
**A:** 다음을 확인하세요:
1. CSS 파일을 import했는지 확인
2. 클래스명 오타 확인
3. CSS 특이성(specificity) 문제 확인
4. 개발자 도구에서 스타일이 override되는지 확인

### Q3: 모바일에서 레이아웃이 깨져요
**A:** 다음을 확인하세요:
```css
/* viewport 메타 태그 확인 */
<meta name="viewport" content="width=device-width, initial-scale=1.0">

/* CSS에서 최대 너비 설정 */
.container {
  max-width: 100%;
  overflow-x: hidden;
}
```

### Q4: 검색 기능을 어떻게 구현하나요?
**A:** 기본적인 필터링 예시:
```jsx
const [searchTerm, setSearchTerm] = useState('');
const [filteredItems, setFilteredItems] = useState(items);

useEffect(() => {
  const filtered = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredItems(filtered);
}, [searchTerm, items]);
```

### Q5: SVG 아이콘이 표시되지 않아요
**A:** viewBox와 크기를 명시적으로 설정하세요:
```jsx
<svg viewBox="0 0 24 24" width="24" height="24">
  <path d="..." fill="currentColor" />
</svg>
```

---

## 🎨 7. 스타일링 접근법 비교

### CSS Modules
```jsx
// CategoryGrid.module.css
.container { /* 스타일 */ }
.item { /* 스타일 */ }

// CategoryGrid.jsx
import styles from './CategoryGrid.module.css';
<div className={styles.container}>
```

### Styled Components
```jsx
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const Item = styled.div`
  padding: 1rem;
  border-radius: 8px;
`;
```

### Tailwind CSS
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="p-4 rounded-lg bg-white shadow">
    {/* 내용 */}
  </div>
</div>
```

---

## 🚀 8. 추가 개선사항 아이디어

### 고급 기능 구현
- **검색 자동완성**: 입력 시 추천 검색어 표시
- **무한 스크롤**: 더 많은 아이템 동적 로딩
- **테마 전환**: 다크모드/라이트모드 지원
- **애니메이션**: Framer Motion 활용

### 성능 개선
- **코드 스플리팅**: React.lazy() 활용
- **이미지 최적화**: WebP 포맷 사용
- **캐싱 전략**: localStorage 활용

---

💡 **기억하세요**: 이 예시들은 참고용입니다. 여러분만의 창의적인 방법으로 구현해보세요! 