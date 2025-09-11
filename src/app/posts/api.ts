import { Post } from "./types";

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch("http://localhost:3000/fiap/v1/posts", {
      headers: {
        "inner-authorization": process.env.NEXT_PUBLIC_API_KEY || "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Erro ao buscar posts:", res.status);
      return [];
    }

    const data = await res.json();

    return data.docs.map((p: any) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      createdAt: p.createdAt,
      user: { name: p.user?.name || "Professor Desconhecido" },
    }));
  } catch (error) {
    console.error("Falha na API:", error);
    return [];
  }
}
