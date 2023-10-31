import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";
import { insertedItemBody } from "@/schemas/insertedItem/InsItemSCHEMA";
import { updateInsertedItemBody } from "@/schemas/insertedItem/updateInsItemSCHEMA";
import { itensBody } from "@/schemas/item/itensSCHEMA";

async function findAllDeletedItens(){
    return prisma.deletedItens.findMany({
        include: {
            insertedItem: {
                include: {
                    item: true,
                }
            },
            user: true,
        }
    })
}

async function findByItemId(itemId:number) {
    return prisma.insertedItens.findMany({
        where: {
            itemId:itemId
        }
    })
}
async function insertItem({userId, insertedItem}: { userId: number, insertedItem: insertedItemBody } ) {
    return prisma.insertedItens.create({
        data: {
            item: {
                connect: { id: insertedItem.itemId },
            },
            user:{
                connect:{id:userId}
            },
            price: insertedItem.price,
            insertedQuantity: insertedItem.insertedQuantity
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







const deletedItemRepository = {
    findAllDeletedItens,
    insertItem,
    updateStock,
    findByItemId
}

export default deletedItemRepository