/*
  Warnings:

  - Added the required column `remainingQuantity` to the `insertedItens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "insertedItens" ADD COLUMN     "remainingQuantity" DOUBLE PRECISION NOT NULL;
