import { NextRequest } from "next/server";
import { ProductoRow, Producto } from "../../../../../types/productos";
import prisma from "../../../../utils/prisma";

export async function GET(request: NextRequest) {
  const productos = await prisma.productos.findMany({
    include: {
      proveedores: true,
      categoria: true,
    },
  });

  return Response.json(productos);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre,
      descripcion,
      stock,
      precio,
      idcategoria,
      idproveedor,
    } = body;

    const producto = await prisma.productos.create({
      data: {
        nombre,
        descripcion,
        stock: Number(stock),
        precio,
        idcategoria: Number(idcategoria),
        idproveedor: Number(idproveedor),
      },
    });

    return Response.json(producto);
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json({ error }, { status: 500 });
  }
}
