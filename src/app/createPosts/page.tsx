"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Button from '@/components/Button/Button';
import { createPost } from '../lib/api';

const Formulario: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState(''); // novo estado para email
  const [token, setToken] = useState('');

  useEffect(() => {
    // Busca o user do localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setEmail(parsedUser.email || ""); 
        setToken(parsedUser.id || "");
      } catch (error) {
        console.error("Erro ao parsear user do localStorage:", error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const postData = { title, content };
      const newPost = await createPost(postData);
      console.log("Dados do post enviados:", postData);
      console.log("Token recebido? " + token);
      console.log("Post criado:", newPost);
      setTitle("");
      setContent("");
    } catch (error) {
      alert("Ocorreu um erro ao enviar o post.");
    }


  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Criar Post</h2>
        <form className={styles.form} onSubmit={handleSubmit}>

          {/* Campo de email desabilitado */}
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email do professor"
              value={email}
              disabled
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              placeholder="Título"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <textarea
              className={styles.input}
              placeholder="Conteúdo"
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={4}
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
            <Button variant="secondary" onClick={() => history.back()}>
              Voltar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
