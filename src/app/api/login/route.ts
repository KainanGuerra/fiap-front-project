import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Requisição server-to-server (sem CORS)
    const res = await fetch("http://localhost:3000/fiap/v1/auth", {
      method: "GET", // ou POST dependendo da sua API
      headers: {
        "Inner-authorization": process.env.NEXT_PUBLIC_API_KEY || "",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return NextResponse.json({ success: false, message: "Erro na API" });

    const users = await res.json();

    const userFound = users.find(
      (u: { email: string}) =>
        u.email === username || "admin"
    );

    if (userFound && password === "admin") return NextResponse.json({ success: true, user: userFound });

    return NextResponse.json({ success: false, message: "Usuário ou senha incorretos" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Erro ao conectar à API" });
  }
}
