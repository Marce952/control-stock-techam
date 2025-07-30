import { NextRequest } from "next/server";
import { conn } from "../../../../utils/database";

export async function GET(request: NextRequest) {
  const response = await conn.query('SELECT * FROM clientes');
  return Response.json(response.rows);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, telefono, mail } = body;

    const response = await conn.query(
      'INSERT INTO clientes (nombre, telefono, mail ) VALUES ($1, $2, $3)',
      [nombre, telefono, mail]
    );
    console.log("🚀 ~ POST ~ response:", response)

    return Response.json({ response });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return Response.json({ error }, { status: 500 });
  }
}