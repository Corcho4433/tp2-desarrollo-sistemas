/*
  Warnings:

  - You are about to drop the column `direccion_envio` on the `clientes` table. All the data in the column will be lost.
  - Added the required column `domicilio_envio` to the `clientes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "domicilio_cliente" (
    "id" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "domicilio" TEXT NOT NULL,
    CONSTRAINT "domicilio_cliente_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clientes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "domicilio_envio" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL
);
INSERT INTO "new_clientes" ("contrasena", "correo", "id", "nombre", "telefono") SELECT "contrasena", "correo", "id", "nombre", "telefono" FROM "clientes";
DROP TABLE "clientes";
ALTER TABLE "new_clientes" RENAME TO "clientes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "domicilio_cliente_id_key" ON "domicilio_cliente"("id");
