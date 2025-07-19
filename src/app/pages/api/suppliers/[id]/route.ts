
import { NextRequest } from "next/server";
import { conn } from "../../../../../utils/database";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    console.log("🚀 ~ GET ~ id:", id)

    if (!id) {
      return Response.json({ error: "Missing supplier id" }, { status: 400 });
    }

    const response = await conn.query('SELECT * FROM proveedores WHERE id = $1', [id]);
    console.log("🚀 ~ GET ~ response:", response)

    return Response.json({ response });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = context.params.id;
    console.log("🚀 ~ GET ~ id:", id)
    const { nombre, direccion, telefono, mail } = body;

    const response = await conn.query(
      'UPDATE proveedores SET nombre = $1, direccion = $2, telefono = $3, mail = $4 WHERE id = $5',
      [nombre, direccion, telefono, mail, id]
    );
    console.log("🚀 ~ PUT ~ response:", response)

    return Response.json({ response });
  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error)
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    console.log("🚀 ~ GET ~ id:", id)

    const response = await conn.query(
      'UPDATE proveedores SET deleted_at = NOW() WHERE id = $1',
      [id]
    );

    console.log("🚀 ~ DELETE ~ response:", response)

    return Response.json({ response });
  } catch (error) {
    console.log("🚀 ~ DELETE ~ error:", error)
    return Response.json({ error }, { status: 500 });
  }
}