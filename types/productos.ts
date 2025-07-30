// types/productos.ts

export interface ProductoRow {
  producto_id: number;
  producto_nombre: string;
	stock: number;
  precio: number;
  idproveedor: number | null;
  idcategoria: number | null;

  proveedor_id: number | null;
  proveedor_nombre: string | null;
  proveedor_direccion: string | null;

  categoria_id: number | null;
  categoria_tipo: string | null;
}

export interface Producto {
  id: number;
  nombre: string;
	stock: number;
  precio: number;
  idproveedor: number | null;
  idcategoria: number | null;
  proveedor: {
    id: number;
    nombre: string;
    direccion: string;
  } | null;
  categoria: {
    id: number;
    tipo: string;
  } | null;
}
