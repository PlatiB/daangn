// React hooks import - useState, useEffect, useRef 추가
import { useState, useEffect, useRef } from 'react';
import { searchConfig } from '../../data/mockData';
import './SearchBar.css';

/**
 * 🔍 SearchBar 컴포넌트
 *
 * 사용자가 검색어를 입력하고 검색할 수 있는 검색창 컴포넌트입니다.
 * 내부적으로 디바운스 기능을 구현하여 성능을 최적화합니다.
 * 초보자도 쉽게 이해할 수 있도록 기본적인 함수 문법을 사용합니다.
 *
 * 📌 props 설명:
 * - onChange: 디바운스된 검색어가 변경될 때 호출되는 함수
 * - onSubmit: 검색 버튼을 클릭하거나 Enter를 누를 때 호출되는 함수
 * - placeholder: 검색창이 비어있을 때 보여줄 안내 문구 (선택사항)
 * - selectedService: 현재 선택된 서비스 (선택사항, 기본값: "중고거래")
 * - onServiceChange: 서비스를 변경할 때 호출되는 함수 (선택사항)
 * - debounceDelay: 디바운스 지연 시간 (선택사항, 기본값: 300ms)
 */
function SearchBar(props: {
  onChange: (value: string) => void;       // 디바운스된 텍스트 변경 시 호출될 함수
  onSubmit: (searchTerm: string) => void;  // 검색 실행 시 호출될 함수
  placeholder?: string;                     // 안내 문구 (선택사항)
  selectedService?: string;                 // 선택된 서비스 (선택사항)
  onServiceChange?: (service: string) => void; // 서비스 변경 함수 (선택사항)
  debounceDelay?: number;                  // 디바운스 지연 시간 (선택사항, 기본값: 300ms)
}) {
  // props에서 필요한 값들을 꺼내옵니다
  // 기본값을 설정해서 props가 없을 때도 동작하도록 합니다
  const onChange = props.onChange;
  const onSubmit = props.onSubmit;
  const debounceDelay = props.debounceDelay || 1000;        // 기본값 300ms (0.3초)
  const placeholder = props.placeholder || searchConfig.placeholder;
  const selectedService = props.selectedService || "중고거래";
  const onServiceChange = props.onServiceChange;

  /**
   * 🎯 내부 상태 관리
   * 사용자가 타이핑하는 동안 즉시 UI를 업데이트하기 위한 내부 state입니다.
   * 이 값은 즉시 화면에 반영되고, 디바운스 후에 부모 컴포넌트로 전달됩니다.
   */
  const [inputValue, setInputValue] = useState('');

  // 검색어가 유효한지 확인합니다 (최소 2글자 이상)
  const searchText = inputValue.trim(); // 앞뒤 공백 제거
  const isValidSearch = searchText.length >= searchConfig.minSearchLength;

  /**
   * 🎯 디바운스 타이머를 저장할 변수
   * useRef를 사용하는 이유:
   * - 컴포넌트가 리렌더링되어도 타이머 ID가 유지됩니다
   * - 이전 타이머를 취소할 때 필요합니다
   */
  const debounceTimerRef = useRef<any>(null);

  /**
   * 🔧 디바운스 기능 구현 (내부에서 자동 처리)
   * useEffect를 사용하여 inputValue가 변경될 때마다 실행됩니다
   *
   * 디바운스란?
   * - 사용자가 타이핑을 멈춘 후 일정 시간(300ms)이 지나면 함수를 실행
   * - 연속적인 입력에서 마지막 입력만 처리하여 성능 최적화
   *
   * 작동 방식:
   * 1. 사용자가 타이핑 → inputValue 즉시 업데이트 (UI 반영)
   * 2. 타이머 시작 → 300ms 대기
   * 3. 300ms 동안 추가 입력 없음 → onChange 호출 (부모에 전달)
   * 4. 300ms 이내 추가 입력 → 이전 타이머 취소, 새 타이머 시작
   */
  useEffect(() => {
    // 검색어가 너무 짧으면 부모 컴포넌트에 전달하지 않습니다
    if (searchText.length === 0) {
      // 입력이 비어있으면 즉시 부모에 빈 문자열 전달
      onChange('');
      return; // 함수 종료
    }

    // 이전 타이머가 있다면 취소합니다
    // 이렇게 하면 사용자가 계속 타이핑할 때 이전 타이머가 실행되지 않습니다
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 새로운 타이머를 설정합니다
    // debounceDelay(300ms) 후에 onChange 함수가 실행됩니다
    debounceTimerRef.current = setTimeout(() => {
      // 디바운스된 값을 부모 컴포넌트에 전달
      onChange(searchText);

      // 디버깅용 로그 (개발 중에만 사용)
      console.log(`🔍 디바운스 검색 값 전달: "${searchText}" (${debounceDelay}ms 지연)`);
    }, debounceDelay);

    // 클린업 함수: 컴포넌트가 언마운트되거나 inputValue가 변경될 때 실행
    return () => {
      // 타이머가 있다면 취소합니다
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputValue, onChange, debounceDelay]); // 의존성 배열: 이 값들이 변경될 때마다 useEffect 재실행

  /**
   * 검색 폼이 제출될 때 실행되는 함수
   * 사용자가 Enter를 누르거나 검색 버튼을 클릭하면 호출됩니다
   */
  function handleSubmit(event: any) {  // event는 폼 제출 이벤트 객체
    // 폼의 기본 동작(페이지 새로고침)을 막습니다
    event.preventDefault();

    // 디바운스 타이머가 있다면 취소합니다 (즉시 검색을 위해)
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // 검색어가 너무 짧으면 검색하지 않습니다
    if (!isValidSearch) {
      console.log('검색어를 최소 ' + searchConfig.minSearchLength + '자 이상 입력해주세요.');
      return; // 함수 종료
    }

    // 검색 실행 - 부모 컴포넌트에서 전달받은 onSubmit 함수를 호출합니다
    onSubmit(searchText);
  }

  /**
   * 사용자가 검색창에 타이핑할 때마다 실행되는 함수
   * 내부 state를 즉시 업데이트하여 UI에 반영합니다
   */
  function handleChange(event: any) {  // event는 입력 변경 이벤트 객체
    // input 요소에서 현재 입력된 값을 가져옵니다
    const newValue = event.target.value;

    // 내부 상태를 즉시 업데이트 (UI에 즉시 반영)
    setInputValue(newValue);

    // 디바운스는 useEffect에서 자동으로 처리됩니다
    // 300ms 후에 부모 컴포넌트의 onChange가 호출됩니다
  }

  /**
   * 키보드 키를 눌렀을 때 실행되는 함수
   * Escape 키를 누르면 검색창에서 포커스를 제거합니다
   */
  function handleKeyDown(event: any) {  // event는 키보드 이벤트 객체
    // Escape 키를 눌렀을 때
    if (event.key === 'Escape') {
      // 디바운스 타이머가 있다면 취소합니다
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // 검색창에서 포커스(커서)를 제거합니다
      event.currentTarget.blur();
      return;
    }

    // Enter 키는 폼 제출로 자동 처리되므로 별도 처리 불필요
  }

  /**
   * 서비스 선택 버튼을 클릭했을 때 실행되는 함수
   */
  function handleServiceClick() {
    // onServiceChange가 props로 전달되었는지 확인합니다
    if (onServiceChange) {
      // 있다면 호출합니다
      onServiceChange("중고거래");
    }
    // 없다면 아무것도 하지 않습니다
  }

  /**
   * 서비스 선택 버튼에서 키보드 이벤트 처리
   * Enter나 Space 키로도 버튼을 클릭할 수 있게 합니다 (접근성)
   */
  function handleServiceKeyDown(event: any) {  // event는 키보드 이벤트 객체
    // Enter 키 또는 Space 키를 눌렀을 때
    if (event.key === 'Enter' || event.key === ' ') {
      // 기본 동작 방지 (Space 키의 스크롤 방지)
      event.preventDefault();
      // 서비스 선택 함수 실행
      handleServiceClick();
    }
  }

  // 컴포넌트가 화면에 그려질 내용을 반환합니다
  return (
    <form className="search-bar-form" onSubmit={handleSubmit}>
      {/* 서비스 선택 버튼 */}
      <button
        type="button"  // submit이 아닌 일반 버튼
        className="service-selector"
        aria-label="검색하려는 서비스를 선택하세요"  // 스크린 리더용 설명
        onClick={handleServiceClick}
        onKeyDown={handleServiceKeyDown}
      >
        <div className="service-selector-content">
          {/* 현재 선택된 서비스 이름 표시 */}
          <span className="service-text">{selectedService}</span>

          {/* 드롭다운 화살표 아이콘 (SVG) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="service-dropdown-icon"
            aria-hidden="true"  // 스크린 리더에서 숨김
          >
            <g>
              <path
                d="M8.17379 8C6.46508 8 5.54326 10.0042 6.65527 11.3016L10.4811 15.765C11.2792 16.6962 12.7199 16.6962 13.5181 15.765L17.3439 11.3016C18.4559 10.0042 17.5341 8 15.8253 8H8.17379Z"
                fill="currentColor"
              />
            </g>
          </svg>
        </div>
      </button>

      {/* 검색 입력 영역 */}
      <div className="search-input-container">
        <div className="search-input-wrapper">
          {/* 검색어 입력창 */}
          <input
            type="search"  // 검색 타입으로 설정
            className="search-input"
            value={inputValue}  // 내부 state 값 (즉시 UI 반영)
            onChange={handleChange}  // 입력 변경 시 실행할 함수
            onKeyDown={handleKeyDown}  // 키 입력 시 실행할 함수
            placeholder={placeholder}  // 안내 문구
            aria-label="검색어 입력"  // 스크린 리더용 설명
            aria-describedby="search-help"  // 도움말과 연결
            minLength={searchConfig.minSearchLength}  // 최소 글자 수
            maxLength={100}  // 최대 글자 수
          />

          {/* 검색 버튼 */}
          <button
            type="submit"  // 폼 제출 버튼
            className="search-button"
            aria-label="검색"  // 스크린 리더용 설명
            disabled={!isValidSearch}  // 검색어가 짧으면 비활성화
            aria-describedby={!isValidSearch ? "search-error" : undefined}
          >
            {/* 검색 아이콘 (화살표 SVG) */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="search-icon"
            >
              <g>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.6507 2.15225C11.1821 2.62088 11.1821 3.38068 11.6507 3.84931L18.1022 10.3008H2.99922C2.33648 10.3008 1.79922 10.8381 1.79922 11.5008C1.79922 12.1635 2.33648 12.7008 2.99922 12.7008H18.1022L11.6507 19.1523C11.1821 19.6209 11.1821 20.3807 11.6507 20.8493C12.1193 21.3179 12.8791 21.3179 13.3477 20.8493L21.8477 12.3493C22.0728 12.1243 22.1992 11.8191 22.1992 11.5008C22.1992 11.1825 22.0728 10.8773 21.8477 10.6523L13.3477 2.15225C12.8791 1.68362 12.1193 1.68362 11.6507 2.15225Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* 접근성을 위한 숨겨진 도움말 (스크린 리더만 읽음) */}
      <div id="search-help" className="sr-only">
        검색어를 입력하고 Enter 키를 누르거나 검색 버튼을 클릭하세요.
      </div>

      {/* 검색어가 짧을 때 표시되는 에러 메시지 (스크린 리더용) */}
      {!isValidSearch && inputValue.length > 0 && (
        <div id="search-error" className="sr-only">
          검색어는 최소 {searchConfig.minSearchLength}자 이상 입력해주세요.
        </div>
      )}
    </form>
  );
}

// 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냅니다
export default SearchBar;