
import { NextRequest } from "next/server";
import { conn } from "../../../../../utils/database";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        const id = context.params.id;
        console.log("🚀 ~ GET ~ id:", id)

        if (!id) {
            return Response.json({ error: "Missing product id" }, { status: 400 });
        }

        const response = await conn.query('SELECT * FROM productos WHERE id = $1', [id]);
        console.log("🚀 ~ GET ~ response:", response)

        return Response.json({ response });
    } catch (error) {
        console.log("🚀 ~ GET ~ error:", error)
        return Response.json({ error }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        const body = await request.json();
        const id = context.params.id;
        console.log("🚀 ~ GET ~ id:", id)
        const { nombre, descripcion, stock, precio, idCategoria, idProveedor, updated_at } = body;

        const response = await conn.query(
            'UPDATE productos SET nombre = $1, descripcion = $2, stock = $3, precio = $4, idCategoria = $5, idProveedor = $6, updated_at = $7 WHERE id = $8',
            [nombre, descripcion, stock, precio, idCategoria, idProveedor, updated_at, id]
        );
        console.log("🚀 ~ PUT ~ response:", response)

        return Response.json({ response });
    } catch (error) {
        console.log("🚀 ~ PUT ~ error:", error)
        return Response.json({ error }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        const id = context.params.id;
        console.log("🚀 ~ GET ~ id:", id)

        const response = await conn.query(
            'UPDATE productos SET deleted_at = NOW() WHERE id = $1',
            [id]
        );
        
        console.log("🚀 ~ DELETE ~ response:", response)

        return Response.json({ response });
    } catch (error) {
        console.log("🚀 ~ DELETE ~ error:", error)
        return Response.json({ error }, { status: 500 });
    }
}