# 당근마켓 CSS 스타일 추출 가이드

## 🎨 Computed 탭에서 스타일 추출 방법

### 1. Computed 스타일 확인
- Elements 탭에서 요소 선택
- 우측 패널의 `Computed` 탭 클릭
- 실제 적용된 스타일 값들 확인

### 2. 각 섹션별 스타일 추출

#### 🏠 헤더 스타일 (header-styles.css)
```
주요 추출 요소:
- 헤더 컨테이너: display, height, padding, background
- 로고: width, height, font-size
- 네비게이션: display, align-items, gap
- 버튼: padding, border-radius, background, color
```

#### 🎯 히어로 섹션 스타일 (hero-styles.css)
```
주요 추출 요소:
- 컨테이너: max-width, padding, margin
- 타이틀: font-size, font-weight, line-height
- 검색 박스: width, height, border, border-radius
- 드롭다운: position, background, box-shadow
```

#### 📱 카테고리 그리드 스타일 (category-styles.css)
```
주요 추출 요소:
- 그리드 컨테이너: display, grid-template-columns, gap
- 카테고리 카드: padding, border-radius, transition
- 아이콘: width, height, margin
- 텍스트: font-size, color, text-align
```

### 3. 스타일 추출 팁

#### 📊 중요한 CSS 속성들
- **레이아웃**: display, position, width, height, margin, padding
- **색상**: color, background-color, border-color
- **타이포그래피**: font-family, font-size, font-weight, line-height
- **인터랙션**: transition, transform, box-shadow
- **반응형**: media queries (Sources 탭에서 확인)

#### 🔍 효율적인 추출 방법
1. **핵심 요소 먼저**: 컨테이너 → 타이틀 → 버튼 순서
2. **상태별 확인**: :hover, :focus, :active 상태도 체크
3. **반응형 확인**: Device Mode로 모바일/태블릿 스타일 체크

### 4. CSS 파일 정리
- 선택자 이름을 React 친화적으로 변경
- 불필요한 vendor prefix 제거
- CSS 변수로 공통 값들 추출
- 주석으로 용도 설명 추가

---

## 🎯 당근마켓 실제 스타일 분석 (https://www.daangn.com/kr/)

### 📋 구체적 스타일 추출 대상

#### 🏠 헤더 스타일 (header-styles.css)
```
추출할 구체적 요소들:
- 헤더 컨테이너: height, padding, background-color
- "검색" 링크: font-size, color, text-decoration
- "앱 다운로드" 버튼: 
  * background-color (당근 주황 #FF7E36?)
  * padding, border-radius, font-weight
  * hover 상태 스타일
- 로고: width, height
```

#### 🎯 히어로 섹션 스타일 (hero-styles.css)  
```
추출할 구체적 요소들:
- "당신 근처의 당근" 타이틀:
  * font-size, font-weight, line-height
  * color (검정? 다크 그레이?)
- "정자동에서 아이폰 찾고 계신가요?" 서브타이틀:
  * font-size, color, margin
- 검색 입력창:
  * width, height, padding
  * border, border-radius, box-shadow
  * focus 상태 스타일 (테두리 색상 변경?)
- 지역 드롭다운:
  * background, border, font-size
  * 화살표 아이콘 스타일
```

#### 📱 카테고리 그리드 스타일 (category-styles.css)
```
추출할 구체적 요소들:
- 그리드 컨테이너:
  * display: grid
  * grid-template-columns (7개 컬럼? 반응형?)
  * gap, padding, max-width
- 각 카테고리 카드:
  * padding, border-radius
  * background-color (흰색? 연한 회색?)
  * hover 효과 (scale? box-shadow?)
  * transition 속성
- 카테고리 아이콘:
  * width, height (32px? 40px?)
  * margin-bottom
- 카테고리 텍스트:
  * font-size, font-weight, color
  * text-align: center
```

#### 🏷️ 인기 검색어 태그 스타일
```
추출할 구체적 요소들:
- 태그 컨테이너: display: flex, flex-wrap, gap
- 개별 태그:
  * padding, border-radius
  * background-color, color
  * border (있다면)
  * hover 상태 변화
```

### 🔍 중점 확인 사항
1. **당근 브랜드 컬러**: #FF7E36 실제 사용 여부
2. **폰트 패밀리**: 시스템 폰트 or 웹폰트 사용
3. **간격 시스템**: margin, padding 일관성
4. **반응형**: 모바일에서 그리드 컬럼 수 변화
5. **인터랙션**: hover, focus 상태 스타일

### 💡 효율적 추출 순서
1. 헤더 → 히어로 → 카테고리 → 태그 순서로 진행
2. 각 요소 선택 후 Computed 탭에서 주요 속성만 추출
3. :hover, :focus 상태도 확인 (Elements에서 :hov 체크박스 활용)
4. 모바일 뷰 전환해서 반응형 스타일도 확인 