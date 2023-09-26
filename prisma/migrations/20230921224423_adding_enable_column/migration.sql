-- AlterTable
ALTER TABLE "insertedItens" ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "enable" BOOLEAN NOT NULL DEFAULT true;
