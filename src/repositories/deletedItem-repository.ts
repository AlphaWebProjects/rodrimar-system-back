import { prisma } from "@/config";

async function findAllDeletedItens(){
    return prisma.deletedItens.findMany({
        include: {
            insertedItem: {
                include: {
                    item: true,
                }
            },
            licensePlate: true,
            user: true,
        }
    })
}
async function createDeleteItem({ insertId, deletedQuantity, deletedBy, licenseId}: { insertId: number, deletedQuantity: number, deletedBy: number, licenseId: number }){
    return prisma.deletedItens.create({
        data: {
            insertId: insertId,
            deletedQuantity: deletedQuantity,
            licenseId: licenseId,
            deletedBy: deletedBy
        }
    })
}

const deletedItemRepository = {
    findAllDeletedItens,
    createDeleteItem
}

export default deletedItemRepository