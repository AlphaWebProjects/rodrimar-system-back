/*
  Warnings:

  - You are about to drop the column `stock` on the `insertedItens` table. All the data in the column will be lost.
  - Added the required column `stock` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "insertedItens" DROP COLUMN "stock";

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "stock" INTEGER NOT NULL;
