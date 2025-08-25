import { NextRequest } from "next/server";
import prisma from "../../../../utils/prisma";

// GET: listar todas las categorías
export async function GET(request: NextRequest) {
  try {
    const response = await prisma.clientes.findMany();
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: "Error al obtener categorías" }, { status: 500 });
  }
}

// POST: insertar nueva categoría
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, telefono, mail, deleted_at } = body;

    const categoria = await prisma.clientes.create({
      data: {
        nombre,
        telefono,
        mail,
        deleted_at
      },
    });

    return Response.json(categoria);
  } catch (error) {
    return Response.json({ error: "Error al crear categoría" }, { status: 500 });
  }
}
