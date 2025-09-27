"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Post } from "./types";
import Button from "@/components/Button/Button";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { updatePost, deletePost, getPosts } from "../lib/api";
import styles from "./page.module.css";
import { clear } from "console";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [professorLogado, setProfessorLogado] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const postsPerPage = 10;
  const router = useRouter();

  // Recupera usuário do localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setProfessorLogado(parsed.id);
    }
  }, []);

  // Debounce da busca
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch posts sempre que currentPage ou debouncedSearch mudarem
  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      const timeout = setTimeout(() => setShowLoading(true), 500);

      try {
        const normalizedTerm =
          debouncedSearch && debouncedSearch.length >= 3
            ? debouncedSearch.trim().toLowerCase()
            : "";
            
        const pageToFetch = currentPage;

        const { posts: fetchedPosts, total } = await getPosts(
          pageToFetch,
          postsPerPage,
          normalizedTerm,
          controller.signal 
        );

        setPosts(fetchedPosts);
        setTotalPosts(total);
      } catch (err) {
        if ((err as any).name === "AbortError") return;
        console.error("Erro ao buscar posts:", err);
      } finally {
        clearTimeout(timeout);
        setLoading(false);
        setShowLoading(false);
      }
    };

    fetchPosts();

    return () => controller.abort(); // cancela fetch anterior se efeito rodar de novo
  }, [currentPage, debouncedSearch]);

  useEffect(() => {
  if (debouncedSearch) setCurrentPage(1);
}, [debouncedSearch]);

  const handleSavePost = async (postAtualizado: Post) => {
    try {
      const salvo = await updatePost(postAtualizado);
      if (!salvo) return;
      setPosts((prev) => prev.map((p) => (p.id === salvo.id ? salvo : p)));
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const sucesso = await deletePost(id);
      if (!sucesso) return;

      const normalizedTerm =
        debouncedSearch && debouncedSearch.length >= 3
          ? debouncedSearch.trim().toLowerCase()
          : "";

      const pageToFetch = normalizedTerm ? 1 : currentPage;

      const { posts: fetchedPosts, total } = await getPosts(
        pageToFetch,
        postsPerPage,
        normalizedTerm
      );

      setPosts(fetchedPosts);
      setTotalPosts(total);
      if (normalizedTerm) setCurrentPage(1);
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  { showLoading && <div>Carregando posts...</div> };

  return (
    <>
      <div className={styles.headerPosts}>
        <input
          type="text"
          placeholder="Buscar posts..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Button variant="action" onClick={() => router.push("/createPosts")}>
          Criar Postagem
        </Button>
      </div>

      <ul className={styles.list}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onSave={handleSavePost}
            onDelete={handleDeletePost}
            professorLogado={professorLogado}
          />
        ))}
      </ul>

      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}