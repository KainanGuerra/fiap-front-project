import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch("http://localhost:3000/fiap/v1/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "inner-authorization": process.env.NEXT_PUBLIC_API_KEY || "",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao conectar ao servidor" });
  }
}
