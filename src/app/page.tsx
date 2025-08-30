import Image from 'next/image';
import Header from '@/components/Header/Header';
import Button from '@/components/Button/Button';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroTextContainer}>
            <h1 className={styles.title}>
              Conectando Professores e Alunos de Forma Simples e Interativa
            </h1>
            <p className={styles.description}>
              A Postly é a plataforma onde professores podem compartilhar conteúdos, 
              ideias e novidades, e alunos podem reagir e comentar em tempo real.
            </p>
            <Button variant="cta">Saiba mais</Button>
          </div>
          <div className={styles.heroImageContainer}>
            <Image 
              src="/hero-illustration.svg"
              alt="Ilustração de pessoas interagindo com uma plataforma online"
              width={500}
              height={375}
              priority
            />
          </div>
        </section>
      </main>
    </>
  );
}
