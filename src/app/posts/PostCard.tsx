"use client";

import React, { useState } from "react";
import { Post } from "./types";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";

interface PostCardProps {
  post: Post;
  onSave?: (postAtualizado: Post) => void;
  professorLogado: string; // nome do professor atual ou id único
}

export default function PostCard({ post, onSave, professorLogado }: PostCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState(post.title);
  const [conteudo, setConteudo] = useState(post.content);
  const [erro, setErro] = useState<{ titulo?: string; conteudo?: string }>({});
  const [aviso, setAviso] = useState(""); // mensagem de aviso quando não autorizado

  const abrirModal = () => {
    /*
    if (post.user.id !== professorLogado) {
      console.log("Tentativa de edição por:", professorLogado, "dono do post:", post.user.id);
      setAviso("Você não tem permissão para editar este post.");
      return;
    }
    setAviso(""); 
    */// Verificação de permissão desativada temporariamente
    setIsModalOpen(true);
  };

  const salvarEdicao = () => {
    const novoErro: typeof erro = {};
    if (titulo.trim().length < 3) {
      novoErro.titulo = "O título deve ter pelo menos 3 caracteres.";
    }
    if (conteudo.trim().length < 10) {
      novoErro.conteudo = "O conteúdo deve ter pelo menos 10 caracteres.";
    }
    if (Object.keys(novoErro).length > 0) {
      setErro(novoErro);
      return;
    }
    setErro({});

    const atualizado: Post = {
      ...post,
      title: titulo,
      content: conteudo,
    };

    onSave?.(atualizado);
    setIsModalOpen(false);
  };

  return (
    <li className={styles.listItem}>
      <h3 className={styles.itemTitle}>{post.title}</h3>
      <p className={styles.itemDescription}>{post.content}</p>
      <p className={styles.itemMeta}>
        Criado em: {new Date(post.createdAt).toLocaleDateString("pt-BR")}
      </p>
      <p className={styles.itemMeta}>Professor: {post.user.name}</p>

      <div className={styles.postFooter}>
        <Button variant="actionTransparent" onClick={abrirModal}>
          ⋯
        </Button>
      </div>

      {/* Aviso de permissão */}
      {aviso && <p className={styles.errorMessage}>{aviso}</p>}

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Editar Post</h2>

            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className={`${styles.input} ${erro.titulo ? styles.errorBorder : ""}`}
              placeholder="Título do post"
            />
            {erro.titulo && <p className={styles.errorMessage}>{erro.titulo}</p>}

            <textarea
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              className={`${styles.textarea} ${erro.conteudo ? styles.errorBorder : ""}`}
              rows={4}
              placeholder="Conteúdo do post"
            />
            {erro.conteudo && <p className={styles.errorMessage}>{erro.conteudo}</p>}

            <div className={styles.modalActions}>
              <Button variant="cta" onClick={salvarEdicao}>
                Salvar
              </Button>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
