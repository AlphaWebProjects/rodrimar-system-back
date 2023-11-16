import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";
import { insertedItemBody } from "@/schemas/insertedItem/InsItemSCHEMA";
import { updateInsertedItemBody } from "@/schemas/insertedItem/updateInsItemSCHEMA";
import { itensBody } from "@/schemas/item/itensSCHEMA";

async function findAllInsertedItens(){
    return prisma.insertedItens.findMany({
        include: {
            item: true,
            user: true,
        }
    })
}
async function findAvailableByItensId(itemId:number) {
    return prisma.insertedItens.findMany({
        where: {
            itemId: itemId,
            enable: true
        },
        orderBy: { createdAt: 'asc' }
    })
}
async function findByItensId(itemId:number) {
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
            insertedQuantity: insertedItem.insertedQuantity,
            remainingQuantity: insertedItem.insertedQuantity,
            receiptBill: insertedItem.receiptBill,
            receiptBillEmissionDate: insertedItem.receiptBillEmissionDate
        },
    });
}
// async function updateStock(upInsertItem: updateInsertedItemBody) {
//     const { id, ...upInsertItemData } = upInsertItem;

//     // Adicione o campo updatedAt com a data e hora atual
//     const dataToUpdate = {
//         ...upInsertItemData,
//         updatedAt: new Date(),
//     };

//     return prisma.insertedItens.update({
//         where: {
//             id: Number(id),
//         },
//         data: dataToUpdate,
//     });
// }
async function updateInsertStock({ insertId, remainingQuantity}: { insertId: number, remainingQuantity: number }){
    return prisma.insertedItens.update({
        where: {
            id: insertId
        },
        data: {
            enable: remainingQuantity === 0 ? false : true,
            remainingQuantity: remainingQuantity
        }
    })
}

const insertedItemRepository = {
    findAllInsertedItens,
    insertItem,
    updateInsertStock,
    findByItensId,
    findAvailableByItensId
}

export default insertedItemRepository