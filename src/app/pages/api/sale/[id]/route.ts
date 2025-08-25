
import { NextRequest } from "next/server";
import prisma from "../../../../../utils/prisma";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
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

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = context.params.id;
    const { total_stock, precio_total, observacion, idproducto, idcliente, idempleado, updated_at } = body;

    const sale = await prisma.ventas.update({
      where: { id: Number(id) },
      data: {
        total_stock,
        precio_total,
        observacion,
        idproducto,
        idcliente,
        idempleado,
        updated_at,
      },
    });

    return Response.json({ sale });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;

    const sale = await prisma.ventas.update({
      where: { id: Number(id) },
      data: { deleted_at: new Date() },
    });

    return Response.json({ sale });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
