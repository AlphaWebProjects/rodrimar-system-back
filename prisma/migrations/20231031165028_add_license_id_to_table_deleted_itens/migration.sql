/*
  Warnings:

  - Added the required column `licenseId` to the `deletedItens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deletedItens" ADD COLUMN     "licenseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "deletedItens" ADD CONSTRAINT "deletedItens_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "licensePlate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
