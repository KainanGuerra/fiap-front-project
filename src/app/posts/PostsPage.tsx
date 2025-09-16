"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { Post } from "./types";
import styles from "./page.module.css";
import { updatePost } from "./api";

type Props = {
  initialPosts: Post[];
};

export default function PostsPage({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [professorLogado, setProfessorLogado] = useState<string>(""); // token do professor
  const postsPerPage = 10;
/*
  // Pega o token do professor logado no client
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    setProfessorLogado(token);
  }, []);
*/
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const handleSavePost = async (postAtualizado: Post) => {
    try {
      const salvo = await updatePost(postAtualizado);
      if (!salvo) return;
      setPosts((prev) =>
        prev.map((p) => (p.id === salvo.id ? salvo : p))
      );
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
    }
  };

  return (
    <>
      <ul className={styles.list}>
        {currentPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onSave={handleSavePost}
            professorLogado={professorLogado} // token logado
          />
        ))}
      </ul>

      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
