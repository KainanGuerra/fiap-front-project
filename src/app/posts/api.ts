import { Post } from "./types";

const API_URL = "http://localhost:3000/fiap/v1/posts";

export async function getPosts(postsPerPage = 15): Promise<Post[]> {
  try {
    // Busca a primeira página para saber o total de páginas
    const firstRes = await fetch(`${API_URL}?page=1&limit=${postsPerPage}`, {
      headers: {
        "inner-authorization": process.env.NEXT_PUBLIC_API_KEY || "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!firstRes.ok) {
      console.error("Erro ao buscar posts:", firstRes.status);
      return [];
    }

    const firstData = await firstRes.json();
    const totalPages = firstData.totalPages;

    const mapPosts = (docs: any[]): Post[] =>
      docs.map((p: any) => ({
        id: p.id,
        title: p.title,
        content: p.content,
        createdAt: p.createdAt,
        user: { name: p.user?.name || "Professor Desconhecido", id: p.user?.id || "" },
      }));

    const allPosts: Post[] = mapPosts(firstData.docs);

    // Gera Promises para todas as páginas restantes
    const remainingPosts = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map((page) =>
        fetch(`${API_URL}?page=${page}&limit=${postsPerPage}`, {
          headers: {
            "inner-authorization": process.env.NEXT_PUBLIC_API_KEY || "",
            "Content-Type": "application/json",
          },
          cache: "no-store",
        })
          .then((res) => res.json())
          .then((data) => mapPosts(data.docs))
      )
    );

    return allPosts.concat(...remainingPosts);
  } catch (error) {
    console.error("Falha na API:", error);
    return [];
  }
}

export async function updatePost(post: Post): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL}/${post.id}`, {
      method: "PATCH", 
      headers: {
        "Authorization": "Bearer " + process.env.NEXT_PUBLIC_BEARER_TOKEN || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
      }),
    });

    if (!res.ok) { 
      console.error("Erro ao atualizar post:", res.status);
      return null;
    }

    const data = await res.json();
    
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
      user: { name: data.user?.name || "Professor Desconhecido"/*,  id: data.user?.id || ""*/ },
    };
  } catch (error) {
    console.error("Falha ao atualizar post:", error);
    return null;
  }
}
