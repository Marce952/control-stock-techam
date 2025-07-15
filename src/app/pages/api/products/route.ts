import { NextRequest } from "next/server";
import { conn } from "../../../../utils/database";

export async function GET(request: NextRequest) {
  const response = await conn.query('SELECT * FROM productos');
  return Response.json({ response });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, descripcion, stock, precio, idCateggoria, idProveedor } = body;

    const response = await conn.query(
      'INSERT INTO productos (nombre, descripcion, stock, precio, idCategoria, idProveedor) VALUES ($1, $2, $3, $4, $5, $6)',
      [nombre, descripcion, stock, precio, idCateggoria, idProveedor]
    );
    console.log("🚀 ~ POST ~ response:", response)

    return Response.json({ response });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return Response.json({ error }, { status: 500 });
  }
}