"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { Post } from "./types";
import styles from "./page.module.css";
import { updatePost } from "../lib/api";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

type Props = {
  initialPosts: Post[];
};

export default function PostsPage({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [professorLogado, setProfessorLogado] = useState<string>(""); // token do professor
  const postsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    // Recupera usuario do localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setProfessorLogado(parsed.id); // ou parsed.name, depende do que vai comparar
    }
  }, []);

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
      <div className={styles.headerPosts}>
        <Button
          variant="action"
          onClick={() => router.push("/createPosts")} // caminho da página de criação
        >
          Criar Postagem
        </Button>
      </div>
      <ul className={styles.list}>
        {currentPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onSave={handleSavePost}
            professorLogado={professorLogado}
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
