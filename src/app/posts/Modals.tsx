import React, { useState, useEffect } from "react";
import { Post } from "./types";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import { validarFormulario } from "@/components/Format/format";

interface ModalsProps {
    post: Post;
    onSave: (postAtualizado: Post) => void;
    onDelete: (id: string) => void;
    professorLogado: string;
    onClose: () => void;
}

export default function Modals({ post, onSave, onDelete, onClose }: ModalsProps) {
    const [titulo, setTitulo] = useState(post.title);
    const [conteudo, setConteudo] = useState(post.content);
    const [idUser, setIdUser] = useState('');
    const [erro, setErro] = useState<{ titulo?: string; conteudo?: string }>({});
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const bearerstoredUser = localStorage.getItem("auth");
        if (bearerstoredUser) {
            try {
                const parsedUser = JSON.parse(bearerstoredUser);
                setIdUser(parsedUser.user.id || "");
            } catch (error) {
                console.error("Erro ao parsear user do localStorage:", error);
            }
        }
    }, []);

    const permissao = post.user.id === idUser;

    const salvarEdicao = () => {
        const novoErro = validarFormulario({ titulo, conteudo });
        if (Object.keys(novoErro).length > 0) {
            setErro(novoErro);
            return;
        }
        setErro({});
        const atualizado: Post = { ...post, title: titulo, content: conteudo };
        onSave(atualizado);
        onClose();
    };

    const confirmarExclusao = () => {
        onDelete(post.id);
        setShowConfirm(false);
        onClose();
    };


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>
                    {permissao ? "Editar Post" : "Detalhes da Postagem"}
                </h2>

                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className={`${styles.input} ${erro.titulo ? styles.errorBorder : ""}`}
                    placeholder="Título do post"
                    disabled={!permissao} // 🔹 usuário sem permissão não edita
                />
                {erro.titulo && <p className={styles.errorMessage}>{erro.titulo}</p>}

                <textarea
                    value={conteudo}
                    onChange={(e) => setConteudo(e.target.value)}
                    className={`${styles.textarea} ${erro.conteudo ? styles.errorBorder : ""}`}
                    rows={4}
                    placeholder="Conteúdo do post"
                    disabled={!permissao}
                />
                {erro.conteudo && <p className={styles.errorMessage}>{erro.conteudo}</p>}

                <div className={styles.modalActions}>
                    {permissao ? (
                        <>
                            <Button variant="action" onClick={salvarEdicao}>Salvar</Button>
                            <Button variant="cta" onClick={() => setShowConfirm(true)}>Excluir</Button>
                        </>
                    ) : null}
                    <Button variant="secondary" onClick={onClose}>Voltar</Button>
                </div>

                {/* Mini-modal de confirmação */}
                {showConfirm && (
                    <div className={styles.confirmOverlay}>
                        <div className={styles.confirmBox}>
                            <p>Tem certeza que deseja excluir o post "{post.title}"?</p>
                            <div className={styles.modalConfirmExclude}>
                                <Button variant="cta" onClick={confirmarExclusao}>Confirmar</Button>
                                <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancelar</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

