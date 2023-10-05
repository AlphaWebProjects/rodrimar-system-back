/*
  Warnings:

  - Added the required column `createdBy` to the `licensePlate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "licensePlate" ADD COLUMN     "createdBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "licensePlate" ADD CONSTRAINT "licensePlate_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
