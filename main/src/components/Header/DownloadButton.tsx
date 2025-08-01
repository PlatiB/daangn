import { useCallback } from 'react';
import styles from './DownloadButton.module.css';

/**
 * 당근마켓 앱 다운로드 버튼 컴포넌트
 * 터치 친화적 크기와 반응형 텍스트를 지원
 *
 * 🎯 성능 최적화 적용:
 * - useCallback: 이벤트 핸들러 함수 메모이제이션
 */
function DownloadButton() {

  /**
   * 🔧 useCallback 최적화 (클릭 핸들러)
   * - 목적: 클릭 이벤트 핸들러 함수 재생성 방지
   * - 효과: 버튼이 리렌더링되어도 동일한 함수 참조 유지
   * - 의존성: [] (빈 배열) - console.log만 사용하므로 외부 의존 없음
   *
   * 💡 useCallback 사용 팁:
   * - 자식 컴포넌트에 props로 전달되는 함수에 특히 유용
   * - React.memo와 함께 사용하면 더욱 효과적
   */
  const handleClick = useCallback(() => {
    // 개발 환경: 콘솔에 클릭 이벤트 로그 출력
    console.log('📱 당근마켓 앱 다운로드 버튼 클릭됨!');
    console.log('🔗 실제 환경에서는 앱스토어/플레이스토어로 이동합니다.');
  }, []); // ✅ 의존성 없음 - 순수한 로그 함수

  /**
   * 🔧 useCallback 최적화 (키보드 핸들러)
   * - 목적: 키보드 이벤트 핸들러 메모이제이션
   * - 의존성: [handleClick] - handleClick 함수를 내부에서 호출
   *
   * ⚠️ 의존성 배열 주의사항:
   * - 함수 내부에서 사용하는 모든 외부 값을 명시해야 함
   * - ESLint의 exhaustive-deps 규칙이 이를 체크해줌
   * - handleClick이 useCallback으로 안정화되어 있어 무한 재생성 방지
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick]); // ✅ handleClick을 의존성으로 정확히 명시

  return (
    <button
      type="button"
      className={styles.downloadButton}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-gtm="gnb_app_download"
      aria-label="당근마켓 앱 다운로드"
    >
      <span className={styles.buttonText}>
        앱 다운로드
      </span>
    </button>
  );
}

export default DownloadButton;