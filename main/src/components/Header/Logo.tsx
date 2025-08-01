import React, { memo } from 'react';
import styles from './Logo.module.css';

/**
 * Logo 컴포넌트의 Props 인터페이스
 */
interface LogoProps {
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 로고 클릭 이벤트 핸들러 */
  onClick?: () => void;
}

/**
 * 당근마켓 로고 컴포넌트
 * 당근 아이콘과 텍스트를 포함한 클릭 가능한 로고
 */
const Logo: React.FC<LogoProps> = ({ className = '', onClick }) => {
  
  const handleLogoClick = () => {
    if (onClick) {
      onClick();
    } else {
      // 기본 동작: 홈으로 이동 (현재는 새로고침)
      window.location.href = '/';
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLogoClick();
    }
  };

  return (
    <div 
      className={`${styles.logo} ${className}`.trim()}
      onClick={handleLogoClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="당근"
    >
      {/* 실제 당근마켓 SVG 로고 (당근 아이콘 + 마켓 텍스트) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="64" 
        fill="none" 
        viewBox="0 0 203 114"
        className={styles.logoSvg}
      >
        {/* 당근 아이콘 부분 */}
        <path 
          fill="#FF6F0F" 
          d="M29.234 36.895C13.09 36.895 0 49.695 0 65.855c0 22.327 29.318 34.175 29.234 34.143-.08.032 29.234-11.816 29.234-34.143 0-16.148-13.089-28.96-29.234-28.96Zm0 40.684A11.069 11.069 0 0 1 18.386 64.34a11.073 11.073 0 0 1 8.702-8.693A11.068 11.068 0 0 1 40.312 66.51a11.07 11.07 0 0 1-11.078 11.088v-.02Z"
        />
        <path 
          fill="#00A05B" 
          d="M35.817 0c-6.823 0-11.574 4.768-12.322 10.4-9.094-2.512-16.22 4.4-16.22 12 0 5.82 3.999 10.52 9.33 12.047 4.299 1.228 12.041.312 12.041.312-.04-1.88 1.692-3.944 4.364-5.824 7.598-5.343 13.54-7.863 14.457-15.151C48.427 6.16 42.767 0 35.817 0Z"
        />
        {/* "마켓" 텍스트 부분 */}
        <path 
          fill="#FF6F0F" 
          d="M116.493 46.963c-6.175 1.94-16.865 2.972-26.907 2.972V37.719h20.74v-9.096H78.465V59.6c17.424 0 32.637-2.1 39.06-4.088l-1.032-8.548ZM131.134 25h-11.106v35.61h11.106V49.448h8.958v-9.716h-8.958V25ZM110.506 60.527c-11.766 0-20.396 6.484-20.396 16 0 9.515 8.639 16 20.396 16 11.758 0 20.396-6.489 20.396-16 0-9.512-8.63-16-20.396-16Zm0 23.091c-5.303 0-9.282-2.544-9.282-7.108 0-4.563 3.979-7.103 9.282-7.103s9.282 2.544 9.282 7.103c0 4.56-3.975 7.108-9.282 7.108ZM161.72 65.25h-11.354v24.092h45.128v-9.536H161.72V65.251ZM194.086 27.971h-44.232v9.536h33.082c0 2.368.112 8-.972 14.4h-40.568v9.864h61.588v-9.848H192.01c1.472-8.088 1.892-14.392 2.076-23.952Z"
        />
      </svg>
    </div>
  );
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default memo(Logo);