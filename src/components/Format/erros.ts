/*import { useState } from "react";
import { createPost } from "@/app/lib/api";

const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

const salvarEdicao = async () => {
  try {
    const res = await createPost({
      id: post.id,
      title: titulo,
      content: conteudo,
    });

    if (res) {
      setIsModalOpen(false); // fecha modal de edição
    }
  } catch (err: any) {
    setErrorMessage(err.message || "Erro inesperado.");
    setIsErrorModalOpen(true); // abre modal de erro
  }
};*/
