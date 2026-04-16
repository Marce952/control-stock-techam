"use server"

import prisma from "@/utils/prisma";

export async function bulkUpdatePrices(
  type: "%" | "$",
  operation: "increase" | "decrease",
  value: number
) {
  if (value <= 0) {
    return { success: false, message: "El valor debe ser mayor a 0." };
  }

  try {
    const products = await prisma.productos.findMany();

    const updatePromises = products.map((product) => {
      let newPriceDec = Number(product.precio);
      if (type === "%") {
        const factor = value / 100;
        if (operation === "increase") {
          newPriceDec = newPriceDec * (1 + factor);
        } else {
          newPriceDec = newPriceDec * (1 - factor);
        }
      } else {
        if (operation === "increase") {
          newPriceDec = newPriceDec + value;
        } else {
          newPriceDec = newPriceDec - value;
        }
      }

      // Evitamos precios negativos
      if (newPriceDec < 0) newPriceDec = 0;

      return prisma.productos.update({
        where: { id: product.id },
        data: { precio: newPriceDec },
      });
    });

    // Execute in a transaction to ensure all or nothing
    await prisma.$transaction(updatePromises);

    return { success: true, message: "Precios actualizados masivamente con éxito." };
  } catch (error) {
    console.error("Error bulk updating prices:", error);
    return { success: false, message: "Hubo un error al actualizar los precios." };
  }
}
