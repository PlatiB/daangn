import React, { memo } from 'react';
import styles from './Header.module.css';
import Logo from './Logo';
import DownloadButton from './DownloadButton';

/**
 * Header 컴포넌트의 Props 인터페이스
 */
interface HeaderProps {
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * 당근마켓 헤더 컴포넌트
 * 로고와 앱 다운로드 버튼을 포함한 반응형 헤더
 */
const Header: React.FC<HeaderProps> = ({ className = '' }) => {

  return (
    <header className={`${styles.header} ${className}`.trim()} role="banner">
      <div className={styles['header-container']}>
        {/* 로고 - 왼쪽 정렬 */}
        <div className={styles['header-logo']}>
          <Logo />
        </div>

        {/* 다운로드 버튼 - 오른쪽 정렬 */}
        <div className={styles['header-actions']}>
          <DownloadButton />
        </div>
      </div>
    </header>
  );
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default memo(Header);