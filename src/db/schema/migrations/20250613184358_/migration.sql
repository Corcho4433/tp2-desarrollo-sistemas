/*
  Warnings:

  - Added the required column `cantidad` to the `platos_pedido` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_platos_pedido" (
    "id" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "id_plato" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    CONSTRAINT "platos_pedido_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "platos_pedido_id_plato_fkey" FOREIGN KEY ("id_plato") REFERENCES "menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_platos_pedido" ("id", "id_pedido", "id_plato") SELECT "id", "id_pedido", "id_plato" FROM "platos_pedido";
DROP TABLE "platos_pedido";
ALTER TABLE "new_platos_pedido" RENAME TO "platos_pedido";
CREATE UNIQUE INDEX "platos_pedido_id_key" ON "platos_pedido"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
