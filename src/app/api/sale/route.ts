import { NextRequest } from "next/server";
import prisma from "@/utils/prisma";

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

// POST: insertar nueva venta
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { total_stock, precio_total, precio_costo_total, tipo_operacion, observacion, idproducto, idcliente, idempleado, created_at, updated_at } = body;

    const venta = await prisma.ventas.create({
      data: {
        total_stock: Number(total_stock),
        precio_total: Number(precio_total),
        precio_costo_total: precio_costo_total ? Number(precio_costo_total) : 0,
        tipo_operacion: tipo_operacion || "venta",
        observacion,
        idproducto: idproducto ? Number(idproducto) : null,
        idcliente: idcliente ? Number(idcliente) : null,
        idempleado: idempleado ? Number(idempleado) : null,
        created_at,
        updated_at
      },
    });

    return Response.json(venta);
  } catch (error) {
    console.log("🚀 ~ POST sale ~ error:", error);
    return Response.json({ error: "Error al crear venta" }, { status: 500 });
  }
}
