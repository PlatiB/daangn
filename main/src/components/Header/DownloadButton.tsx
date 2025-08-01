import React, { memo } from 'react';
import styles from './DownloadButton.module.css';

/**
 * DownloadButton 컴포넌트의 Props 인터페이스
 */
interface DownloadButtonProps {
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 버튼 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 모바일에서 다른 텍스트 표시 여부 */
  isMobile?: boolean;
}

/**
 * 당근마켓 앱 다운로드 버튼 컴포넌트
 * 터치 친화적 크기와 반응형 텍스트를 지원
 */
const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  className = '', 
  onClick,
  isMobile = false 
}) => {
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // 개발 환경: 콘솔에 클릭 이벤트 로그 출력
      console.log('📱 당근마켓 앱 다운로드 버튼 클릭됨!');
      console.log('🔗 실제 환경에서는 앱스토어/플레이스토어로 이동합니다.');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  // 모바일과 데스크톱에서 다른 텍스트 표시
  const buttonText = isMobile ? '앱' : '앱 다운로드';

  return (
    <button
      type="button"
      className={`${styles.downloadButton} ${className}`.trim()}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-gtm="gnb_app_download"
      aria-label="당근마켓 앱 다운로드"
    >
      <span className={styles.buttonText}>
        {buttonText}
      </span>
    </button>
  );
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default memo(DownloadButton);