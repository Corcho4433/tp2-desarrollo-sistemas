/*
  Warnings:

  - Added the required column `subtotal` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_cliente" TEXT NOT NULL,
    "id_estado" TEXT NOT NULL,
    "subtotal" REAL NOT NULL,
    "monto_total" REAL NOT NULL,
    "porcentaje_descuento" INTEGER NOT NULL,
    "domicilio_entrega" TEXT NOT NULL,
    CONSTRAINT "pedidos_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedidos_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "estado_pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedidos" ("domicilio_entrega", "id", "id_cliente", "id_estado", "monto_total", "porcentaje_descuento") SELECT "domicilio_entrega", "id", "id_cliente", "id_estado", "monto_total", "porcentaje_descuento" FROM "pedidos";
DROP TABLE "pedidos";
ALTER TABLE "new_pedidos" RENAME TO "pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
