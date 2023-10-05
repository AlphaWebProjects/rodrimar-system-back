-- CreateTable
CREATE TABLE "deletedItens" (
    "id" SERIAL NOT NULL,
    "insertedItemId" INTEGER NOT NULL,
    "deletedQuantity" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deletedItens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deletedItens" ADD CONSTRAINT "deletedItens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deletedItens" ADD CONSTRAINT "deletedItens_insertedItemId_fkey" FOREIGN KEY ("insertedItemId") REFERENCES "insertedItens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
