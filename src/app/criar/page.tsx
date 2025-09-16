"use client";

import React, { useState } from "react";
import Button from "@/components/Button/Button"; // ajusta o caminho conforme sua estrutura

type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  data: string;
};

export default function PostlyEditar() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      titulo: "Atividade de Matemática",
      conteudo: "Resolver equações do 2º grau.",
      data: new Date().toLocaleString(),
    },
    {
      id: 2,
      titulo: "Leitura",
      conteudo: "Ler o capítulo 3 do livro.",
      data: new Date().toLocaleString(),
    },
  ]);

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [novoTitulo, setNovoTitulo] = useState<string>("");
  const [novoConteudo, setNovoConteudo] = useState<string>("");

  const iniciarEdicao = (post: Post) => {
    setEditandoId(post.id);
    setNovoTitulo(post.titulo);
    setNovoConteudo(post.conteudo);
  };

  const salvarEdicao = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, titulo: novoTitulo, conteudo: novoConteudo } : post
      )
    );
    setEditandoId(null);
    setNovoTitulo("");
    setNovoConteudo("");
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNovoTitulo("");
    setNovoConteudo("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Postly ✏️ - Edição de Posts
      </h1>

      <div>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhum post disponível.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-100 rounded-xl p-4 mb-4 shadow-sm"
            >
              {editandoId === post.id ? (
                <div>
                  <input
                    type="text"
                    value={novoTitulo}
                    onChange={(e) => setNovoTitulo(e.target.value)}
                    className="w-full border rounded-lg p-2 mb-2"
                  />
                  <textarea
                    value={novoConteudo}
                    onChange={(e) => setNovoConteudo(e.target.value)}
                    className="w-full border rounded-lg p-2 mb-2"
                    rows={3}
                  ></textarea>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => salvarEdicao(post.id)}
                      variant="cta"
                    >
                      Salvar
                    </Button>
                    <Button
                      onClick={cancelarEdicao}
                      variant="secondary"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-semibold">{post.titulo}</h2>
                  <p className="text-gray-700 mt-2">{post.conteudo}</p>
                  <small className="text-gray-500 block mt-2">
                    Postado em: {post.data}
                  </small>
                  <Button
                    onClick={() => iniciarEdicao(post)}
                    variant="primary"
                  >
                    Editar
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
