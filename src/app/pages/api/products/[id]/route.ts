
import { NextRequest } from "next/server";
import prisma from "../../../../../utils/prisma";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    if (!id) {
      return Response.json({ error: "Missing product id" }, { status: 400 });
    }

    const product = await prisma.productos.findUnique({
      where: { id: Number(id) },
    });

    return Response.json(product || null);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = context.params.id;
    console.log("🚀 ~ PUT ~ id:", id)
    const { nombre, descripcion, stock, precio, idcategoria, idproveedor, updated_at } = body;

    const product = await prisma.productos.update({
      where: { id: Number(id) },
      data: {
        nombre,
        descripcion,
        stock: Number(stock),
        precio,
        idcategoria: Number(idcategoria) || null,
        idproveedor: Number(idproveedor) || null,
        updated_at: updated_at ? new Date(updated_at) : undefined,
      },
    });

    return Response.json({ product });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;

    const deletedProduct = await prisma.productos.update({
      where: { id: Number(id) },
      data: { deleted_at: new Date() },
    });

    return Response.json({ deletedProduct });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}