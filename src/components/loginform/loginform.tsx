"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Button from "@/components/Button/Button";
import styles from "@/app/login/page.module.css";

// Ícones
const AtIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z"/>
  </svg>
);

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tentando logar:", { username, password });
    
    if (username === "admin" && password === "admin") {
      console.log("Login bem-sucedido!");
      router.push('/');
      // Redirecionar ou atualizar o estado de autenticação aqui
    } 
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <span className={styles.icon}><AtIcon /></span>
        <input
          type="text"
          placeholder="@usuário"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.icon}><LockIcon /></span>
        <input
          type="password"
          placeholder="Senha"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" variant="action" fullWidth>
        Entrar
      </Button>
    </form>
  );
}
