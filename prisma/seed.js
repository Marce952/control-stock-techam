const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)];
}

function randInt(rand, min, max) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

function toMoneyString(n) {
  return Number(n).toFixed(2);
}

async function main() {
  const shouldReset = process.env.SEED_RESET === "true" || process.argv.includes("--reset");

  // Si ya hay datos, no volvemos a insertar a menos que se pida reset.
  const hasProducts = await prisma.productos.findFirst({
    select: { id: true },
  });

  if (hasProducts && !shouldReset) {
    console.log("Seed: ya existen productos. Ejecuta con SEED_RESET=true o --reset para regenerar.");
    return;
  }

  if (shouldReset) {
    // Borramos en el orden correcto para evitar referencias.
    await prisma.ventas.deleteMany({});
    await prisma.productos.deleteMany({});
    await prisma.clientes.deleteMany({});
    await prisma.empleados.deleteMany({});
    await prisma.proveedores.deleteMany({});
    await prisma.categoria.deleteMany({});
  }

  const rand = mulberry32(1337);

  const categorias = [
    "Almacén",
    "Bebidas",
    "Lácteos",
    "Panadería",
    "Limpieza",
    "Snacks",
  ];

  const proveedores = [
    { nombre: "Distribuidora El Trébol", direccion: "Av. Siempre Viva 123", telefono: "541111234567", mail: "ventas@trebol.com.ar", sitio: "trebol.com.ar" },
    { nombre: "Mayorista San Martín", direccion: "Ruta 8 Km 42", telefono: "541122334455", mail: "contacto@sanmartin.com.ar", sitio: "sanmartin.com.ar" },
    { nombre: "Cooperativa Centro", direccion: "Calle 9 de Julio 456", telefono: "541133344455", mail: "hola@centrocoop.com.ar", sitio: "centrocoop.com.ar" },
  ];

  const clientes = [
    { nombre: "Juan Pérez", telefono: "541111223344", mail: "juan.perez@email.com" },
    { nombre: "María González", telefono: "541122334455", mail: "maria.gonzalez@email.com" },
    { nombre: "Carlos Rodríguez", telefono: "541133445566", mail: "carlos.rodriguez@email.com" },
    { nombre: "Ana Torres", telefono: "541144556677", mail: "ana.torres@email.com" },
    { nombre: "Sofía Herrera", telefono: "541155667788", mail: "sofia.herrera@email.com" },
  ];

  const empleados = [
    { nombre: "Empleado POS 1", rol: "cajero", telefono: "541200000001", mail: null },
    { nombre: "Empleado POS 2", rol: "cajero", telefono: "541200000002", mail: null },
  ];

  const createdCategorias = await Promise.all(
    categorias.map((tipo) => prisma.categoria.create({ data: { tipo } }))
  );
  const createdProveedores = await Promise.all(
    proveedores.map((p) => prisma.proveedores.create({ data: p }))
  );
  const createdClientes = await Promise.all(
    clientes.map((c) => prisma.clientes.create({ data: c }))
  );
  const createdEmpleados = await Promise.all(
    empleados.map((e) => prisma.empleados.create({ data: e }))
  );

  const productCatalog = [
    // Almacén
    { codigo_barras: "7791000000011", nombre: "Arroz 1kg", descripcion: "Bolsa de arroz largo fino", categoria: 0, proveedor: 0, stock_minimo: 20, stock: 18, precio_costo: 620, precio: 990 },
    { codigo_barras: "7791000000028", nombre: "Azúcar 1kg", descripcion: "Azúcar refinada", categoria: 0, proveedor: 1, stock_minimo: 15, stock: 12, precio_costo: 480, precio: 820 },
    { codigo_barras: "7791000000035", nombre: "Harina 1kg", descripcion: "Harina común tamizada", categoria: 0, proveedor: 2, stock_minimo: 25, stock: 40, precio_costo: 500, precio: 860 },
    { codigo_barras: "7791000000042", nombre: "Lentejas 500g", descripcion: "Lentejas secas", categoria: 0, proveedor: 1, stock_minimo: 10, stock: 6, precio_costo: 420, precio: 720 },

    // Bebidas
    { codigo_barras: "7792000000018", nombre: "Agua 500ml", descripcion: "Agua mineral sin gas", categoria: 1, proveedor: 0, stock_minimo: 60, stock: 55, precio_costo: 180, precio: 320 },
    { codigo_barras: "7792000000025", nombre: "Gaseosa 1.5L", descripcion: "Gaseosa sabor cola", categoria: 1, proveedor: 1, stock_minimo: 30, stock: 20, precio_costo: 520, precio: 890 },
    { codigo_barras: "7792000000032", nombre: "Jugo 1L", descripcion: "Jugo mix frutas", categoria: 1, proveedor: 2, stock_minimo: 25, stock: 75, precio_costo: 430, precio: 780 },

    // Lácteos
    { codigo_barras: "7793000000015", nombre: "Leche 1L", descripcion: "Leche entera pasteurizada", categoria: 2, proveedor: 0, stock_minimo: 40, stock: 38, precio_costo: 610, precio: 980 },
    { codigo_barras: "7793000000022", nombre: "Yogur natural", descripcion: "Yogur natural 195g", categoria: 2, proveedor: 1, stock_minimo: 30, stock: 12, precio_costo: 240, precio: 420 },
    { codigo_barras: "7793000000039", nombre: "Queso untable", descripcion: "Queso untable cremoso", categoria: 2, proveedor: 2, stock_minimo: 10, stock: 9, precio_costo: 950, precio: 1450 },

    // Panadería
    { codigo_barras: "7794000000012", nombre: "Pan lactal", descripcion: "Pan de molde lactal", categoria: 3, proveedor: 1, stock_minimo: 20, stock: 15, precio_costo: 520, precio: 860 },
    { codigo_barras: "7794000000029", nombre: "Facturas surtidas", descripcion: "Caja de 6 facturas", categoria: 3, proveedor: 2, stock_minimo: 10, stock: 7, precio_costo: 980, precio: 1490 },

    // Limpieza
    { codigo_barras: "7795000000019", nombre: "Detergente 500ml", descripcion: "Detergente para vajilla", categoria: 4, proveedor: 0, stock_minimo: 40, stock: 60, precio_costo: 190, precio: 360 },
    { codigo_barras: "7795000000026", nombre: "Lavandina 1L", descripcion: "Lavandina con cloro", categoria: 4, proveedor: 1, stock_minimo: 25, stock: 5, precio_costo: 250, precio: 430 },

    // Snacks
    { codigo_barras: "7796000000016", nombre: "Chips 85g", descripcion: "Papas fritas sabor original", categoria: 5, proveedor: 2, stock_minimo: 30, stock: 25, precio_costo: 180, precio: 330 },
    { codigo_barras: "7796000000023", nombre: "Barrita cereal", descripcion: "Barrita de cereal", categoria: 5, proveedor: 0, stock_minimo: 50, stock: 35, precio_costo: 120, precio: 220 },
  ];

  const createdProducts = await Promise.all(
    productCatalog.map((p) =>
      prisma.productos.create({
        data: {
          codigo_barras: p.codigo_barras,
          nombre: p.nombre,
          descripcion: p.descripcion,
          stock: p.stock,
          stock_minimo: p.stock_minimo,
          precio_costo: toMoneyString(p.precio_costo),
          precio: toMoneyString(p.precio),
          idcategoria: createdCategorias[p.categoria].id,
          idproveedor: createdProveedores[p.proveedor].id,
        },
      })
    )
  );

  const observations = [
    "Venta por caja rápida",
    "Venta con descuento",
    "Pago en efectivo",
    "Pago con tarjeta",
    "Venta rápida POS",
    "Cliente habitual",
    "Reposición menor",
  ];

  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;

  const ventasToCreate = [];
  // Generamos ventas en los últimos 45 días con algunos registros hoy.
  for (let dayBack = 0; dayBack <= 45; dayBack++) {
    const isBusierDay = rand() < 0.6;
    const salesCount = isBusierDay ? randInt(rand, 2, 6) : randInt(rand, 0, 3);

    for (let i = 0; i < salesCount; i++) {
      const product = pick(rand, createdProducts);
      const qty = randInt(rand, 1, 5);

      // En una pequeña proporción creamos "perdida" (el dashboard lo filtra).
      const isLoss = rand() < 0.08;
      const tipo_operacion = isLoss ? "perdida" : "venta";

      const precio_total = isLoss ? 0 : Number(product.precio) * qty;
      const precio_costo_total = Number(product.precio_costo || 0) * qty;

      const clienteChance = rand();
      const idcliente =
        clienteChance < 0.85 ? pick(rand, createdClientes).id : null;

      const idempleado =
        rand() < 0.9 ? pick(rand, createdEmpleados).id : null;

      const created_at = new Date(
        now.getTime() - dayBack * dayMs + randInt(rand, 0, 23) * 60 * 60 * 1000 + randInt(rand, 0, 59) * 60 * 1000
      );

      ventasToCreate.push({
        total_stock: qty,
        precio_total: toMoneyString(precio_total),
        precio_costo_total: toMoneyString(precio_costo_total),
        tipo_operacion,
        observacion: isLoss ? "Merma / pérdida" : pick(rand, observations),
        idproducto: product.id,
        idcliente,
        idempleado,
        created_at,
        updated_at: created_at,
      });
    }
  }

  // Insert en lotes (para no saturar).
  const batchSize = 200;
  for (let i = 0; i < ventasToCreate.length; i += batchSize) {
    const batch = ventasToCreate.slice(i, i + batchSize);
    await prisma.ventas.createMany({ data: batch });
  }

  console.log(`Seed: listo. Categorias=${categorias.length}, Productos=${createdProducts.length}, Clientes=${createdClientes.length}, Proveedores=${createdProveedores.length}, Ventas=${ventasToCreate.length}`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

