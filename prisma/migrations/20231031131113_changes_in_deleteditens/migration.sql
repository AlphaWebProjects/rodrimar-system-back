/*
  Warnings:

  - You are about to drop the column `insertedItemId` on the `deletedItens` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `deletedItens` table. All the data in the column will be lost.
  - Added the required column `deletedBy` to the `deletedItens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deletedItemId` to the `deletedItens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "deletedItens" DROP CONSTRAINT "deletedItens_insertedItemId_fkey";

-- DropForeignKey
ALTER TABLE "deletedItens" DROP CONSTRAINT "deletedItens_userId_fkey";

-- AlterTable
ALTER TABLE "deletedItens" DROP COLUMN "insertedItemId",
DROP COLUMN "userId",
ADD COLUMN     "deletedBy" INTEGER NOT NULL,
ADD COLUMN     "deletedItemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "deletedItens" ADD CONSTRAINT "deletedItens_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deletedItens" ADD CONSTRAINT "deletedItens_deletedItemId_fkey" FOREIGN KEY ("deletedItemId") REFERENCES "insertedItens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
