import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";
import { insertedItemBody } from "@/schemas/insertedItem/InsItemSCHEMA";
import { itensBody } from "@/schemas/item/itensSCHEMA";

async function findAllInsertedItens(){
    return prisma.insertedItens.findMany()
}

async function findItemWithName(name:string){
    return prisma.item.findFirst({
        where: {
            name:name
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

async function updateStock(id:number) {
    
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
    findItemWithName,
    insertItem,
    updateStock
}

export default insertedItemRepository