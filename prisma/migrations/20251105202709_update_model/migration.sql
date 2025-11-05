/*
  Warnings:

  - You are about to drop the column `isAdopted` on the `Pet` table. All the data in the column will be lost.

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
    "isLiked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Pet" ("accentCol", "age", "breed", "createdAt", "description", "id", "image", "isLiked", "location", "name", "primaryCol", "sex", "traits") SELECT "accentCol", "age", "breed", "createdAt", "description", "id", "image", "isLiked", "location", "name", "primaryCol", "sex", "traits" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
