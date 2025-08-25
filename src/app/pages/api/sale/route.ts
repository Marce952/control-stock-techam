import { NextRequest } from "next/server";
import prisma from "../../../../utils/prisma";

// GET: listar todas las categorías
export async function GET(request: NextRequest) {
  try {
    const response = await prisma.ventas.findMany({
      include: {
        clientes: true,
        productos: true
      }
    });
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: "Error al obtener categorías" }, { status: 500 });
  }
}

// POST: insertar nueva categoría
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { total_stock, precio_total, observacion, idproducto, idcliente, idempleado, created_at, updated_at } = body;

    const venta = await prisma.ventas.create({
      data: {
        total_stock,
        precio_total,
        observacion,
        idproducto,
        idcliente,
        idempleado,
        created_at,
        updated_at
      },
    });

    return Response.json(venta);
  } catch (error) {
    return Response.json({ error: "Error al crear categoría" }, { status: 500 });
  }
}
