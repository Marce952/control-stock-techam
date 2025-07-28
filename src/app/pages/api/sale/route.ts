import { NextRequest } from "next/server";
import { conn } from "../../../../utils/database";

export async function GET(request: NextRequest) {
  const response = await conn.query('SELECT * FROM ventas');
  return Response.json(response.rows);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { total_stock, precio_total, observacion, idproducto, idcliente, idempleado } = body;

    const response = await conn.query(
      'INSERT INTO ventas (total_stock, precio_total, observacion, idproducto, idcliente, idempleado) VALUES ($1, $2, $3, $4, $5, $6)',
      [total_stock, precio_total, observacion, idproducto, idcliente, idempleado]
    );
    console.log("🚀 ~ POST ~ response:", response)

    return Response.json({ response });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    return Response.json({ error }, { status: 500 });
  }
}