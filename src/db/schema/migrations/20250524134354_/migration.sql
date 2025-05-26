/*
  Warnings:

  - You are about to drop the column `id_platos` on the `pedidos` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_cliente" TEXT NOT NULL,
    "id_estado" TEXT NOT NULL,
    "monto_total" REAL NOT NULL,
    "porcentaje_descuento" INTEGER NOT NULL,
    "domicilio_entrega" TEXT NOT NULL,
    CONSTRAINT "pedidos_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_domicilio_entrega_fkey" FOREIGN KEY ("domicilio_entrega") REFERENCES "domicilio_cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado_pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("domicilio_entrega", "id", "id_cliente", "id_estado", "monto_total", "porcentaje_descuento") SELECT "domicilio_entrega", "id", "id_cliente", "id_estado", "monto_total", "porcentaje_descuento" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
