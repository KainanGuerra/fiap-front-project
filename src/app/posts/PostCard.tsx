"use client";

import { Post } from "./types";
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
    </li>
  );
}

