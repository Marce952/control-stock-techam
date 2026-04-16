
import { NextRequest } from "next/server";
import prisma from "@/utils/prisma";

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
    const { codigo_barras, nombre, descripcion, stock, stock_minimo, precio, precio_costo, idcategoria, idproveedor, updated_at } = body;

    const product = await prisma.productos.update({
      where: { id: Number(id) },
      data: {
        codigo_barras: codigo_barras || null,
        nombre,
        descripcion,
        stock: stock !== undefined ? Number(stock) : undefined,
        stock_minimo: stock_minimo !== undefined ? Number(stock_minimo) : undefined,
        precio: precio !== undefined ? Number(precio) : undefined,
        precio_costo: precio_costo !== undefined ? Number(precio_costo) : undefined,
        idcategoria: idcategoria ? Number(idcategoria) : null,
        idproveedor: idproveedor ? Number(idproveedor) : null,
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