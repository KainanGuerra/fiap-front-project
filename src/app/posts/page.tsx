import { getPosts } from "./api";
import PostsPage from "./PostsPage";
import styles from "./page.module.css";

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Lista de Posts</h2>
      <PostsPage initialPosts={posts} />
    </main>
  );
}
