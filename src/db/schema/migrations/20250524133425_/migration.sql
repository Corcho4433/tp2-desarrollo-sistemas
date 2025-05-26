/*
  Warnings:

  - The primary key for the `pedidos` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_cliente" TEXT NOT NULL,
    "id_estado" TEXT NOT NULL,
    "id_platos" TEXT NOT NULL,
    "monto_total" REAL NOT NULL,
    "porcentaje_descuento" INTEGER NOT NULL,
    "domicilio_entrega" TEXT NOT NULL,
    CONSTRAINT "pedidos_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_domicilio_entrega_fkey" FOREIGN KEY ("domicilio_entrega") REFERENCES "domicilio_cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado_pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("domicilio_entrega", "id", "id_cliente", "id_estado", "id_platos", "monto_total", "porcentaje_descuento") SELECT "domicilio_entrega", "id", "id_cliente", "id_estado", "id_platos", "monto_total", "porcentaje_descuento" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
CREATE TABLE "new_platos_pedido" (
    "id" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "id_plato" TEXT NOT NULL,
    CONSTRAINT "platos_pedido_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "platos_pedido_id_plato_fkey" FOREIGN KEY ("id_plato") REFERENCES "menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_platos_pedido" ("id", "id_pedido", "id_plato") SELECT "id", "id_pedido", "id_plato" FROM "platos_pedido";
DROP TABLE "platos_pedido";
ALTER TABLE "new_platos_pedido" RENAME TO "platos_pedido";
CREATE UNIQUE INDEX "platos_pedido_id_key" ON "platos_pedido"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
