/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `mesas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "mesas_numero_key" ON "mesas"("numero");
