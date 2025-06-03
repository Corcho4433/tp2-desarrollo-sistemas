-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_menu" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" REAL NOT NULL,
    "categoria" TEXT NOT NULL,
    CONSTRAINT "menu_categoria_fkey" FOREIGN KEY ("categoria") REFERENCES "categorias" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_menu" ("categoria", "descripcion", "id", "nombre", "precio") SELECT "categoria", "descripcion", "id", "nombre", "precio" FROM "menu";
DROP TABLE "menu";
ALTER TABLE "new_menu" RENAME TO "menu";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
