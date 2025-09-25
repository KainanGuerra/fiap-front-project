"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { Post } from "./types";
import styles from "./page.module.css";
import { updatePost, deletePost } from "../lib/api";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

type Props = {
  initialPosts: Post[];
};

export default function PostsPage({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [professorLogado, setProfessorLogado] = useState<string>(""); // token do professor
  const [searchTerm, setSearchTerm] = useState(""); // valor digitado na caixa de busca
  const [debouncedSearch, setDebouncedSearch] = useState(""); // valor final após debounce
  const postsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    // Recupera usuario do localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setProfessorLogado(parsed.id);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler); // limpa o timeout se o usuário digitar de novo
    };
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1); // volta para a primeira página quando a busca mudar
  }, [debouncedSearch]);

  // Filtra posts com base no termo buscado
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    post.user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

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

  const handleDeletePost = async (id: string) => {
    try {
      const sucesso = await deletePost(id);
      if (!sucesso) return;
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  return (
    <>
      <div className={styles.headerPosts}>
        <input type="text"
          placeholder="Buscar posts..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />

        <Button
          variant="action"
          onClick={() => {router.push("/createPosts")
            const id = localStorage.getItem("auth");
            console.log("auth", id);
          }} // caminho da página de criação
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
            onDelete={handleDeletePost}
            professorLogado={professorLogado}
          />
        ))}
      </ul>

      <Pagination
        totalPosts={filteredPosts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
