import { prisma } from "@/config";

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
async function createDeletedItem({ userId, insertId, deletedQuantity}: { userId: number, insertId: number, deletedQuantity: number }) {
    return prisma.deletedItens.create({
        data: {
            insertId: insertId,
            deletedQuantity: deletedQuantity,
            deletedBy: userId
        }
    })
}
async function createDeleteItem({ insertId, deletedQuantity, deletedBy}: { insertId: number, deletedQuantity: number, deletedBy: number }){
    return prisma.deletedItens.create({
        data: {
            insertId: insertId,
            deletedQuantity: deletedQuantity,
            deletedBy: deletedBy
        }
    })
}

const deletedItemRepository = {
    findAllDeletedItens,
    createDeletedItem,
    createDeleteItem
}

export default deletedItemRepository