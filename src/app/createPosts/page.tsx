// Formulario.tsx
"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Button from '@/components/Button/Button';

interface UserRole {
  id: number;
  name: string;
  role: string;
}

const Formulario: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetch('http://localhost:3000/fiap/v1/posts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRoles(data);
        } else if (Array.isArray(data.users)) {
          setRoles(data.users);
        } else {
          console.error('Formato de dados inesperado', data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode fazer o POST para sua API

    const postData = { title, content, roleId: selectedRole || "PROFESSOR" };
    try {
      const response = await fetch("http://localhost:3000/fiap/v1/posts", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error('Erro ao enviar o post ' + response.statusText);

      const data = await response.json();
      console.log('Post enviado com sucesso:', data);

      // Resetar form
      setTitle('');
      setContent('');
      setSelectedRole(undefined);

      alert('Post enviado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao enviar o post.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Criar Post</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              placeholder="Titulo"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              placeholder="Conteudo"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                console.log({ title, content, selectedRole });
                // Aqui você pode fazer o POST para sua API
              }}
            >
              Enviar
            </Button>

            <Button
              variant="secondary"
              onClick={() => {}}
            >
              Voltar
            </Button>
          
        </form>
      </div>
    </div>
  );
};

export default Formulario;
