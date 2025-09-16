import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/components/Contexts/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Postly - Conectando Professores e Alunos",
  description: "A plataforma para compartilhar conhecimento e interagir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
      <AuthProvider>
        {children}
      </AuthProvider>
        </body>
    </html>
  );
}