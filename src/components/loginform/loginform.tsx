"use client";

import { useAuth } from "@/components/Contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import styles from "@/app/login/page.module.css";
import { Eye, EyeOff } from "lucide-react";
import { loginAPI } from "@/app/lib/api";


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
    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" />
  </svg>
);

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tentando logar:", { username, password });

    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username.trim()) {
      newErrors.username = "Por favor, digite seu usuário";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Por favor, digite sua senha";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        login();
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        setErrors({ username: "", password: data.message || "Erro ao logar" });
      }
    } catch (err) {
      console.error(err);
      setErrors({ username: "", password: "Erro ao conectar ao servidor" });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <span className={styles.icon}><AtIcon /></span>
        <input
          type="text"
          placeholder="@usuário"
          className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.icon}><LockIcon /></span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className={styles.showPasswordBtn}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>
      <Button type="submit" variant="action" fullWidth>
        Entrar
      </Button>
    </form>
  );
}
