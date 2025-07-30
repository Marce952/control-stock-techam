import { NextRequest } from "next/server";
import { conn } from "../../../../utils/database";
import { ProductoRow, Producto } from "../../../../../types/productos";

export async function GET(request: NextRequest) {
  const response = await conn.query(`
    SELECT 
      productos.id AS producto_id,
      productos.nombre AS producto_nombre,
      productos.precio,
      productos.stock,
      productos.idproveedor,
      productos.idcategoria,

      proveedores.id AS proveedor_id,
      proveedores.nombre AS proveedor_nombre,
      proveedores.direccion AS proveedor_direccion,

      categoria.id AS categoria_id,
      categoria.tipo AS categoria_tipo
    FROM productos 
    LEFT JOIN proveedores ON productos.idproveedor = proveedores.id
    LEFT JOIN categoria ON productos.idcategoria = categoria.id;
  `);

  // Cast explícito del resultado a ProductoRow[]
  const rows = response.rows as ProductoRow[];

  const productos: Producto[] = rows.map(row => ({
    id: row.producto_id,
    nombre: row.producto_nombre,
    precio: row.precio,
    stock: row.stock,
    idproveedor: row.idproveedor,
    idcategoria: row.idcategoria,
    proveedor: row.proveedor_id
      ? {
        id: row.proveedor_id,
        nombre: row.proveedor_nombre!,
        direccion: row.proveedor_direccion!,
      }
      : null,
    categoria: row.categoria_id
      ? {
        id: row.categoria_id,
        tipo: row.categoria_tipo!,
      }
      : null,
  }));

  return Response.json(productos);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre,
      descripcion = "hola",
      stock,
      precio,
      idCateggoria,
      idProveedor
    } = body;

    const response = await conn.query(
      `INSERT INTO productos (nombre, descripcion, stock, precio, idCategoria, idProveedor)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre, descripcion, stock, precio, idCateggoria, idProveedor]
    );

    console.log("🚀 ~ POST ~ response:", response);

    return Response.json({ response });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return Response.json({ error }, { status: 500 });
  }
}
