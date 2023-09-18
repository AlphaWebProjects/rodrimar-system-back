-- CreateTable
CREATE TABLE "insertedItens" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "insertedQuantity" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "insertedItens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "insertedItens" ADD CONSTRAINT "insertedItens_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
