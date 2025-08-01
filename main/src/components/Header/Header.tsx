import styles from './Header.module.css';
import Logo from './Logo';
import DownloadButton from './DownloadButton';

/**
 * 당근마켓 헤더 컴포넌트
 * 로고와 앱 다운로드 버튼을 포함한 반응형 헤더
 */
function Header() {
  return (
    <header className={styles.header} role="banner">
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
}

export default Header;