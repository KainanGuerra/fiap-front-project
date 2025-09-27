import PostsPage from "./PostsPage";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";

export default function Page() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h2 className={styles.title}>Listagem de Posts</h2>
        <PostsPage />
      </main>
    </>
  );
}
