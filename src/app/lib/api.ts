import { Post } from "../posts/types";
import { validarFormulario } from "@/components/Format/format";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/fiap/v1";

export async function getPosts(
  page = 1,
  postsPerPage = 10,
  searchTerm: string = "",
  signal?: AbortSignal
): Promise<{ posts: Post[]; total: number }> {
  try {
    const token = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth") || "").token
      : "";

    let url = `${API_URL}/posts?page=${page}&limit=${postsPerPage}`;
    if (searchTerm) {
      url += `&term=${encodeURIComponent(searchTerm)}`;
    }

    const res = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      signal,
    });

    if (!res.ok) {
      console.error("Erro ao buscar posts:", res.status);
      return { posts: [], total: 0 };
    }

    const data = await res.json();

    const mappedPosts: Post[] = data.docs.map((p: any) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      createdAt: p.createdAt,
      user: { name: p.user?.name || "Professor Desconhecido", id: p.user?.id || "" },
    }));

    return { posts: mappedPosts, total: data.totalDocs || data.total || mappedPosts.length };
  } catch (error) {
    if ((error as any).name === "AbortError") return { posts: [], total: 0 }; // fetch abortado
    console.error("Falha na API:", error);
    return { posts: [], total: 0 };
  }
}


export async function updatePost(post: Post): Promise<Post | null> {
  try {

    //Validação
    const erros = validarFormulario({ titulo: post.title, conteudo: post.content });
    if (Object.keys(erros).length > 0) {
      console.error("Erros de validação:", erros);
    }

    // Pega o item do localStorage
    const authString = localStorage.getItem("auth");
    const auth = authString ? JSON.parse(authString) : null;
    const token = auth?.token;

    const res = await fetch(`${API_URL}/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
      }),
    });

    if (!res.ok) {
      console.log(token)
      console.error("Erro ao atualizar post:", res.status);
      return null;
    }

    const data = await res.json();

    return {
      id: data.id,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
      user: { name: data.user?.name || "Professor Desconhecido", id: data.user?.id || "" },
    };
  } catch (error) {
    console.error("Falha ao atualizar post:", error);
    return null;
  }
}

export async function loginAPI(email: string, password: string) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return { success: false, message: errorData?.message || "Usuário ou senha incorretos" };
    }

    const data = await res.json();
    console.log("LoginAPI response data:", data);
    return { success: true, user: data.user, accessToken: data.accessToken };
  } catch (err: any) {
    console.error("LoginAPI error:", err);
    return { success: false, message: "Erro ao conectar à API" };
  }
}

export interface CreatePostData {
  title: string;
  content: string;
}

export async function createPost(postData: CreatePostData) {
  try {
    //Validação
    const erros = validarFormulario({ titulo: postData.title, conteudo: postData.content });
    if (Object.keys(erros).length > 0) {
      Object.defineProperty(erros, 'isValidationError', { value: true });
      return erros;
    }

    const authString = localStorage.getItem("auth");
    const auth = authString ? JSON.parse(authString) : null;
    const token = auth?.token;

    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) throw new Error('Erro ao enviar o post ' + response.statusText);

    const data = await response.json();
    console.log("Token API:", token)

    if (response.ok) { console.log('Post enviado com sucesso:', data); }

    return data;

  } catch (error) {
    console.error("Falha ao atualizar post:", error);
    throw error;
  }

}

export async function deletePost(id: string): Promise<boolean> {
  try {
    // Pega o token do localStorage
    const authString = localStorage.getItem("auth");
    const auth = authString ? JSON.parse(authString) : null;
    const token = auth?.token;

    const res = await fetch(`${API_URL}/posts/${id}/remove`, {
      method: "PATCH",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deleted: true }), // se a API espera flag de exclusão
    });

    if (!res.ok) {
      console.error("Erro ao excluir post:", res.status);
      return false;
    }

    return true; // sucesso
  } catch (error) {
    console.error("Falha ao excluir post:", error);
    return false;
  }
}
