
import { NextRequest } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    console.log("🚀 ~ GET ~ id:", id);

    if (!id) {
      return Response.json({ error: "Missing client id" }, { status: 400 });
    }

    const client = await prisma.clientes.findUnique({
      where: { id: Number(id) },
    });
    console.log("🚀 ~ GET ~ client:", client);

    return Response.json({ client });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = context.params.id;
    console.log("🚀 ~ PUT ~ id:", id);
    const { nombre, telefono, mail, deuda } = body;

    const client = await prisma.clientes.update({
      where: { id: Number(id) },
      data: {
        nombre,
        telefono,
        mail,
        deuda,
      },
    });
    console.log("🚀 ~ PUT ~ client:", client);

    return Response.json({ client });
  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const id = context.params.id;
    console.log("🚀 ~ DELETE ~ id:", id);

    const client = await prisma.clientes.update({
      where: { id: Number(id) },
      data: {
        deleted_at: new Date(),
      },
    });

    console.log("🚀 ~ DELETE ~ client:", client);

    return Response.json({ client });
  } catch (error) {
    console.log("🚀 ~ DELETE ~ error:", error);
    return Response.json({ error }, { status: 500 });
  }
}