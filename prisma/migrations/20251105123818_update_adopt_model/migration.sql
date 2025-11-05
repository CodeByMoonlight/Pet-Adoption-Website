/*
  Warnings:

  - Added the required column `petId` to the `Adopt` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adopt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "petId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Adopt" ("address", "createdAt", "email", "id", "name", "phoneNo", "reason") SELECT "address", "createdAt", "email", "id", "name", "phoneNo", "reason" FROM "Adopt";
DROP TABLE "Adopt";
ALTER TABLE "new_Adopt" RENAME TO "Adopt";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
