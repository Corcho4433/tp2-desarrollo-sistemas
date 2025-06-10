-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "domicilio_envio" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "cantidad_pedidos" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_clientes" ("contrasena", "correo", "domicilio_envio", "id", "nombre", "telefono") SELECT "contrasena", "correo", "domicilio_envio", "id", "nombre", "telefono" FROM "clientes";
DROP TABLE "clientes";
ALTER TABLE "new_clientes" RENAME TO "clientes";
CREATE UNIQUE INDEX "clientes_correo_key" ON "clientes"("correo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
