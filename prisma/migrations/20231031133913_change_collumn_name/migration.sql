/*
  Warnings:

  - You are about to drop the column `deletedItemId` on the `deletedItens` table. All the data in the column will be lost.
  - Added the required column `insertId` to the `deletedItens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "deletedItens" DROP CONSTRAINT "deletedItens_deletedItemId_fkey";

-- AlterTable
ALTER TABLE "deletedItens" DROP COLUMN "deletedItemId",
ADD COLUMN     "insertId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "deletedItens" ADD CONSTRAINT "deletedItens_insertId_fkey" FOREIGN KEY ("insertId") REFERENCES "insertedItens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
