"use client";

import { Post } from "./types";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default function PostCard({ post }: { post: Post }) {
  return (
    <li className={styles.listItem}>
      <h3 className={styles.itemTitle}>{post.title}</h3>
      <p className={styles.itemDescription}>{post.content}</p>
      <p className={styles.itemMeta}>
        Criado em: {new Date(post.createdAt).toLocaleDateString("pt-BR")}
      </p>
      <p className={styles.itemMeta}>Professor: {post.user.name}</p>
        <div className={styles.postFooter}>
        <Button variant="actionTransparent" onClick={() => {
        console.log("Entrar nos detalhes do post:", post.id);
      // aqui você pode fazer navegação, abrir modal, etc.
        }}>⋯</Button>
      </div>
    </li>
  );
}

