import Logo from '@/components/Logo/Logo';
import Button from '@/components/Button/Button';
import styles from './page.module.css';
import LoginForm from '@/components/loginform/loginform';

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <div className={styles.loginCard}>
        <Logo />
        <h2 className={styles.title}>Entrar</h2>
       <LoginForm />
        <div className={styles.signupSection}>
          <p className={styles.signupText}>Não tem conta?</p>
          <Button variant="secondary" fullWidth>Inscrever-se</Button>
        </div>
      </div>
    </main>
  );
}
