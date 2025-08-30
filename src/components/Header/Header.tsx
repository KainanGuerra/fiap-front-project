import Link from 'next/link';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import styles from './Header.module.css';

const UserIcon = () => (
    <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <Logo />
        </Link>
        <nav>
          <Link href="/login">
            <Button variant="primary">
              <UserIcon />
              Entrar
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;