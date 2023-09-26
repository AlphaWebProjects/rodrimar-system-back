import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";
import { insertedItemBody } from "@/schemas/insertedItem/InsItemSCHEMA";
import { updateInsertedItemBody } from "@/schemas/insertedItem/updateInsItemSCHEMA";
import { itensBody } from "@/schemas/item/itensSCHEMA";

async function findAllInsertedItens(){
    return prisma.insertedItens.findMany()
}

async function findByItemId(itemId:number) {
    return prisma.insertedItens.findMany({
        where: {
            itemId:itemId
        }
    })
}
async function insertItem(insertedItem: insertedItemBody) {
    const existingItem = await prisma.insertedItens.findFirst({
        where: {
            itemId: insertedItem.itemId,
        },
    });

    const newStock = existingItem
        ? existingItem.stock + insertedItem.insertedQuantity
        : insertedItem.insertedQuantity;

    return prisma.insertedItens.create({
        data: {
            item: {
                connect: { id: insertedItem.itemId },
            },
            price: insertedItem.price,
            insertedQuantity: insertedItem.insertedQuantity,
            stock: newStock,
        },
    });
}

async function updateStock(upInsertItem: updateInsertedItemBody) {
    const { id, ...upInsertItemData } = upInsertItem;

    // Adicione o campo updatedAt com a data e hora atual
    const dataToUpdate = {
        ...upInsertItemData,
        updatedAt: new Date(),
    };

    return prisma.insertedItens.update({
        where: {
            id: Number(id),
        },
        data: dataToUpdate,
    });
}





async function createItem(item:itensBody) {
    return prisma.item.create({
        data: {
            name: item.name,
            description: item.description,
            lastPrice: item.lastPrice,
            subCategoryId: item.subCategoryId,
            imageId: item.imageId, 
          }
    })
}


const insertedItemRepository = {
    findAllInsertedItens,
    createItem,
    insertItem,
    updateStock,
    findByItemId
}

export default insertedItemRepository