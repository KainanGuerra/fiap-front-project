"use client"

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Button from '@/components/Button/Button';
import { createPost } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function Formulario() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [erro, setErro] = useState<{ titulo?: string; conteudo?: string }>({});
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

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

        const postData = { title, content };
        const newPost = await createPost(postData);

        const erro = newPost;
        console.log(erro)

        if (erro && (erro as any).isValidationError) {
            setErro(erro);
            return;
        }
        setErro({});

        setTitle("");
        setContent("");
        setSuccessMessage("Post criado com sucesso!");
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
                            className={`${styles.input} ${erro.titulo ? styles.errorBorder : ""}`}
                            type="text"
                            placeholder="Título"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />{erro.titulo && <p className={styles.errorMessage}>{erro.titulo}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                        <textarea
                            className={`${styles.input} ${erro.conteudo ? styles.errorBorder : ""}`}
                            placeholder="Conteúdo"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={4}
                        />{erro.conteudo && <p className={styles.errorMessage}>{erro.conteudo}</p>}
                        {!erro.conteudo && !erro.titulo && <p>{successMessage}</p>}
                    </div>

                    <div className={styles.buttonGroup}>
                        <Button variant="primary" type="submit" onClick={() => { }}>
                            Enviar
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            router.push("/posts");
                            router.refresh();
                        }}>
                            Voltar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};


