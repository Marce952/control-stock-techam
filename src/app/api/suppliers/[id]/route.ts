
import { NextRequest } from "next/server";
import prisma from "@/utils/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) {
      return Response.json({ error: "Missing supplier id" }, { status: 400 });
    }

    const supplier = await prisma.proveedores.findUnique({
      where: { id: Number(id) },
    });

    return Response.json({ supplier });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const body = await request.json();
    const { id } = await context.params;
    const { nombre, direccion, telefono, mail, sitio } = body;

    const supplier = await prisma.proveedores.update({
      where: { id: Number(id) },
      data: { nombre, direccion, telefono, mail, sitio },
    });

    return Response.json({ supplier });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

// export async function DELETE(request: NextRequest, context: RouteContext) {
//   try {
//     const { id } = await context.params;

//     const supplier = await prisma.proveedores.update({
//       where: { id: Number(id) },
//       data: { deleted_at: new Date() },
//     });

//     return Response.json({ supplier });
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }
