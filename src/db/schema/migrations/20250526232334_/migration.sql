-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mesas" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "estado_mesa" TEXT NOT NULL,
    "id_cliente" TEXT,
    CONSTRAINT "mesas_estado_mesa_fkey" FOREIGN KEY ("estado_mesa") REFERENCES "estado_mesa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "mesas_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_mesas" ("estado_mesa", "id", "id_cliente", "numero") SELECT "estado_mesa", "id", "id_cliente", "numero" FROM "mesas";
DROP TABLE "mesas";
ALTER TABLE "new_mesas" RENAME TO "mesas";
CREATE UNIQUE INDEX "mesas_id_key" ON "mesas"("id");
CREATE UNIQUE INDEX "mesas_id_cliente_key" ON "mesas"("id_cliente");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
