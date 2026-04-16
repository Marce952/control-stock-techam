import { NextRequest } from "next/server";
import { ProductoRow, Producto } from "../../../../types/productos";
import prisma from "@/utils/prisma";

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
      codigo_barras,
      nombre,
      descripcion,
      stock,
      stock_minimo,
      precio,
      precio_costo,
      idcategoria,
      idproveedor,
    } = body;

    const producto = await prisma.productos.create({
      data: {
        codigo_barras: codigo_barras || null,
        nombre,
        descripcion,
        stock: stock ? Number(stock) : 0,
        stock_minimo: stock_minimo ? Number(stock_minimo) : 0,
        precio: precio ? Number(precio) : 0,
        precio_costo: precio_costo ? Number(precio_costo) : 0,
        idcategoria: idcategoria ? Number(idcategoria) : null,
        idproveedor: idproveedor ? Number(idproveedor) : null,
      },
    });

    return Response.json(producto);
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json({ error }, { status: 500 });
  }
}
