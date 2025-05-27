/*
  Warnings:

  - You are about to drop the column `numero` on the `mesas` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `mesas` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mesas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado_mesa" TEXT NOT NULL,
    "id_cliente" TEXT,
    CONSTRAINT "mesas_estado_mesa_fkey" FOREIGN KEY ("estado_mesa") REFERENCES "estado_mesa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "mesas_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_mesas" ("estado_mesa", "id", "id_cliente") SELECT "estado_mesa", "id", "id_cliente" FROM "mesas";
DROP TABLE "mesas";
ALTER TABLE "new_mesas" RENAME TO "mesas";
CREATE UNIQUE INDEX "mesas_id_cliente_key" ON "mesas"("id_cliente");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
