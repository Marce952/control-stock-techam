import { NextRequest } from "next/server";
import { conn } from "../../../../utils/database";

export async function GET(request: NextRequest) {
  const response = await conn.query('SELECT * FROM categoria');
  return Response.json(response.rows);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo } = body;

    const response = await conn.query(
      'INSERT INTO categoria (tipo) VALUES ($1)',
      [tipo]
    );
    console.log("🚀 ~ POST ~ response:", response)

    return Response.json({ response });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return Response.json({ error }, { status: 500 });
  }
}