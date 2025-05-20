-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "categoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "estado_mesa" (
    "id" TEXT NOT NULL,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "estado_pedido" (
    "id" TEXT NOT NULL,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "menu" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "categoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mesas" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "estado_mesa" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_cliente" TEXT NOT NULL,
    "estado" INTEGER NOT NULL,
    "id_platos" TEXT NOT NULL,
    "monto_total" REAL NOT NULL,
    "porcentaje_descuento" INTEGER NOT NULL,
    "domicilio_entrega" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "platos_pedido" (
    "id" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "id_plato" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_id_key" ON "categorias"("id");

-- CreateIndex
CREATE UNIQUE INDEX "estado_mesa_id_key" ON "estado_mesa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "estado_pedido_id_key" ON "estado_pedido"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mesas_id_key" ON "mesas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "platos_pedido_id_key" ON "platos_pedido"("id");
