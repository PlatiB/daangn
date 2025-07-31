# Daangn 클론 프로젝트 (Main)

이 폴더는 **단일 React 프로젝트**로 당근마켓 랜딩페이지를 단계별로 구현합니다.

## 🎯 **Git Checkpoint 시스템**

각 Phase 완료 시점마다 Git checkpoint를 만들어 두어, 실습자가 중간에 막혔을 때 해당 시점으로 돌아갈 수 있습니다.

### **📌 Checkpoint 목록**
```bash
# 프로젝트 초기 설정 완료
git checkout checkpoint-phase-1

# 헤더 컴포넌트 완성
git checkout checkpoint-phase-2  

# 히어로 섹션 기본 구조 완성
git checkout checkpoint-phase-3

# Props & State 적용 완성
git checkout checkpoint-phase-4

# 폼 입력 & useEffect 완성
git checkout checkpoint-phase-5

# 카테고리 그리드 완성
git checkout checkpoint-phase-6

# API 호출 & 비동기 처리 완성
git checkout checkpoint-phase-7

# React Router 적용 완성
git checkout checkpoint-phase-8

# Context API 전환 완성
git checkout checkpoint-phase-9

# 반응형 디자인 & 최적화 완성
git checkout checkpoint-phase-10
```

## 🏗️ **단일 프로젝트 접근법의 장점**

### ✅ **실무와 동일한 경험**
- 하나의 프로젝트에서 점진적으로 기능 추가
- 실제 개발 프로세스와 일치
- Git 히스토리를 통한 발전 과정 추적

### ✅ **자연스러운 학습**
- Props를 사용하면서 자연스럽게 State 필요성 체감
- 컴포넌트가 복잡해지면서 자연스럽게 useEffect 도입
- API 호출 필요성이 생기면서 비동기 처리 학습

### ✅ **효율적인 관리**
- 하나의 package.json, 하나의 번들러
- 통합된 의존성 관리
- 일관된 프로젝트 설정

## 🚀 **실습 시작하기**

1. **최신 상태로 시작**:
   ```bash
   git checkout main
   npm install
   npm start
   ```

2. **특정 Phase부터 시작** (중간 합류 시):
   ```bash
   git checkout checkpoint-phase-3
   npm install  
   npm start
   ```

3. **이전 Phase로 돌아가기** (막혔을 때):
   ```bash
   git stash  # 현재 작업 임시 저장
   git checkout checkpoint-phase-2
   ```

## 📁 **프로젝트 구조**
```
main/
├── src/
│   ├── components/          # React 컴포넌트들
│   │   ├── Header/
│   │   ├── HeroSection/
│   │   ├── CategoryGrid/
│   │   └── PopularTags/
│   ├── data/               # reference/data/mockData.js 복사본
│   ├── styles/             # CSS 파일들
│   └── App.js              # 메인 앱 컴포넌트
├── public/                 # 정적 파일들
├── package.json           # 의존성 관리
└── README.md              # 이 파일
```

## 📚 **참고 자료**
- `../reference/rendered-html/` → 실제 당근마켓 HTML 구조
- `../reference/data/mockData.js` → 표준 데이터
- `../reference/design-tokens.txt` → 브랜드 컬러, 폰트
- `../.cursor/rules/daangn-practice.mdc` → AI 자동 가이드 