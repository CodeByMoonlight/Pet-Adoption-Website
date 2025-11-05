/*
  Warnings:

  - Added the required column `accentCol` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryCol` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "traits" TEXT,
    "primaryCol" TEXT NOT NULL,
    "accentCol" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Pet" ("age", "breed", "createdAt", "description", "id", "image", "location", "name", "sex", "traits") SELECT "age", "breed", "createdAt", "description", "id", "image", "location", "name", "sex", "traits" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
