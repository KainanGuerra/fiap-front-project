"use client";

import React, { useState } from "react";
import { Post } from "./types";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import Modals from "./Modals";

interface PostCardProps {
  post: Post;
  onSave: (postAtualizado: Post) => void;
  onDelete: (id: string) => void;
  professorLogado: string;
}

export default function PostCard({ post, onSave, onDelete, professorLogado }: PostCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <li className={styles.listItem}>
      <h3 className={styles.itemTitle}>{post.title}</h3>
      <p className={styles.itemDescription}>{post.content}</p>
      <p className={styles.itemMeta}>Criado em: {new Date(post.createdAt).toLocaleDateString("pt-BR")}</p>
      <p className={styles.itemMeta}>Professor: {post.user.name}</p>

      <div className={styles.postFooter}>
        <Button variant="actionTransparent" onClick={() =>  setIsModalOpen(true)}>⋯</Button>
      </div>

      {isModalOpen && <Modals
        post={post}
        onSave={onSave}
        onDelete={onDelete}
        professorLogado={professorLogado}
        onClose={() => setIsModalOpen(false)}
      />}
    </li >
  );
}