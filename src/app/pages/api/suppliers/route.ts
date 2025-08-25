import { NextRequest } from "next/server";
import prisma from "../../../../utils/prisma";

// GET: listar todas las categorías
export async function GET(request: NextRequest) {
  try {
    const response = await prisma.proveedores.findMany();
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: "Error al obtener categorías" }, { status: 500 });
  }
}

// POST: insertar nueva categoría
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, direccion, telefono, mail, sitio } = body;

    const proveedor = await prisma.proveedores.create({
      data: {
        nombre,
        direccion,
        telefono,
        mail,
        sitio
      },
    });

    return Response.json(proveedor);
  } catch (error) {
    return Response.json({ error: "Error al crear categoría" }, { status: 500 });
  }
}
