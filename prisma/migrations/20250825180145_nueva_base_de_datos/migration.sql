-- CreateTable
CREATE TABLE "public"."categoria" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(20),

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."clientes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "telefono" VARCHAR(20),
    "mail" VARCHAR(30),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."empleados" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "rol" VARCHAR(15) NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "mail" VARCHAR(30),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "empleados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."productos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "descripcion" VARCHAR(150),
    "stock" INTEGER DEFAULT 0,
    "precio" DECIMAL(10,2) NOT NULL,
    "idcategoria" INTEGER,
    "idproveedor" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."proveedores" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "direccion" VARCHAR(50),
    "telefono" VARCHAR(20),
    "mail" VARCHAR(30),
    "sitio" VARCHAR(100),

    CONSTRAINT "proveedores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ventas" (
    "id" SERIAL NOT NULL,
    "total_stock" INTEGER NOT NULL,
    "precio_total" DECIMAL(10,2) NOT NULL,
    "observacion" VARCHAR(150),
    "idproducto" INTEGER,
    "idcliente" INTEGER,
    "idempleado" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_idcategoria_fkey" FOREIGN KEY ("idcategoria") REFERENCES "public"."categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."productos" ADD CONSTRAINT "productos_idproveedor_fkey" FOREIGN KEY ("idproveedor") REFERENCES "public"."proveedores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ventas" ADD CONSTRAINT "ventas_idcliente_fkey" FOREIGN KEY ("idcliente") REFERENCES "public"."clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ventas" ADD CONSTRAINT "ventas_idempleado_fkey" FOREIGN KEY ("idempleado") REFERENCES "public"."empleados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ventas" ADD CONSTRAINT "ventas_idproducto_fkey" FOREIGN KEY ("idproducto") REFERENCES "public"."productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
