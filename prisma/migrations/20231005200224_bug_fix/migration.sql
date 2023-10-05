-- DropForeignKey
ALTER TABLE "insertedItens" DROP CONSTRAINT "insertedItens_createdBy_fkey";

-- AddForeignKey
ALTER TABLE "insertedItens" ADD CONSTRAINT "insertedItens_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
