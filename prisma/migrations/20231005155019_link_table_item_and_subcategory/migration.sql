-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "subCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
