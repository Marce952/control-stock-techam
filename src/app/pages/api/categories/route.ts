import { NextRequest } from "next/server";
import prisma from "../../../../utils/prisma"; 

// GET: listar todas las categorías
export async function GET(request: NextRequest) {
  try {
    const response = await prisma.categoria.findMany();
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: "Error al obtener categorías" }, { status: 500 });
  }
}

// POST: insertar nueva categoría
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo } = body;

    const categoria = await prisma.categoria.create({
      data: { tipo },
    });

    return Response.json(categoria);
  } catch (error) {
    return Response.json({ error: "Error al crear categoría" }, { status: 500 });
  }
}
