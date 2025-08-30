import Image from 'next/image';
import styles from './Logo.module.css';

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="/logo.svg"
        alt="Logo da Postly"
        width={100}
        height={100}
        className={styles.logoIcon}
      />
      <span className={styles.logoText}>Postly</span>
    </div>
  );
};

export default Logo;