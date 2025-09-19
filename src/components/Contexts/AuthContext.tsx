'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isLoggedIn: boolean;
  user: any;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  

  useEffect(() => {
    // Recupera login salvo no localStorage
    const authString = localStorage.getItem("auth");
    if (authString) {
      const auth = JSON.parse(authString);
      setUser(auth.user);
      setToken(auth.token);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = () => {
    setUser(user)
    setToken(token)
    setIsLoggedIn(true)
    localStorage.setItem("auth", JSON.stringify({ user, token }));
  };

  const logout = () => {
    setUser(null)
    setToken(null)
    setIsLoggedIn(false)
    localStorage.removeItem("auth");
    router.push("/");
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      {!loading && children} {/* 👈 só renderiza a UI quando pronto */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
