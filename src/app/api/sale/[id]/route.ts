
import { NextRequest } from "next/server";
import prisma from "@/utils/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) {
      return Response.json({ error: "Missing sale id" }, { status: 400 });
    }

    const sale = await prisma.ventas.findUnique({
      where: { id: Number(id) },
    });

    return Response.json({ sale });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const body = await request.json();
    const { id } = await context.params;
    const { total_stock, precio_total, precio_costo_total, tipo_operacion, observacion, idproducto, idcliente, idempleado, updated_at } = body;

    const sale = await prisma.ventas.update({
      where: { id: Number(id) },
      data: {
        total_stock: total_stock !== undefined ? Number(total_stock) : undefined,
        precio_total: precio_total !== undefined ? Number(precio_total) : undefined,
        precio_costo_total: precio_costo_total !== undefined ? Number(precio_costo_total) : undefined,
        tipo_operacion: tipo_operacion || undefined,
        observacion,
        idproducto: idproducto ? Number(idproducto) : null,
        idcliente: idcliente ? Number(idcliente) : null,
        idempleado: idempleado ? Number(idempleado) : null,
        updated_at,
      },
    });

    return Response.json({ sale });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const sale = await prisma.ventas.update({
      where: { id: Number(id) },
      data: { deleted_at: new Date() },
    });

    return Response.json({ sale });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
