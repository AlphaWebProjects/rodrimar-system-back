import { notFoundError } from '@/errors/not-found-error';
import itemRepository from '@/repositories/item-repository';
import deletedItemRepository from '@/repositories/deletedItem-repository';
import insertedItemRepository from '@/repositories/insertItem-repository';

async function getAllDeletedItens(){
    const allItens = await deletedItemRepository.findAllDeletedItens()
    
    const formatedItens = allItens.map(e => {
        return {
            deletedId: e.id,
            deletedQuantity: e.deletedQuantity,
            deletedBy: {
                userEmail: e.user.email,
                userId: e.user.id,
                userName: e.user.name,
                userRole: e.user.role,
            },
            deletedItem: e.insertedItem,
            updatedAt: e.updatedAt,
            createdAt: e.createdAt,
            licensePlate: {
                licenseId: e.licensePlate.id,
                licenseName: e.licensePlate.license,
            }
        }
    })

    return formatedItens
}
async function verifyItemExist(itemId: number) {
    const item = await itemRepository.findItemById(itemId)

    if (!item) {
        throw notFoundError("O id do item não esta cadastrado")
    }

    return item
}
async function createDeleteItem({ userId, itemId, deletedQuantity, newStock, licenseId}: { userId: number, itemId: number, deletedQuantity: number, newStock: number, licenseId: number}) {

    const insertedItens = await insertedItemRepository.findAvailableByItensId(itemId)

    let remainingToDelete = deletedQuantity

    for (const insertion of insertedItens) {

        if (remainingToDelete <= 0) {
            break;
        }
        
        let deletedAmountFromThisInsertion = remainingToDelete >= insertion.insertedQuantity ? insertion.insertedQuantity : remainingToDelete

        await insertedItemRepository.updateInsertStock({insertId: insertion.id, remainingQuantity: insertion.remainingQuantity - deletedAmountFromThisInsertion })
       
        await deletedItemRepository.createDeleteItem({insertId: insertion.id, deletedQuantity: deletedAmountFromThisInsertion, deletedBy: userId, licenseId})

        remainingToDelete -= deletedAmountFromThisInsertion
    }

    await itemRepository.updateStock({ newStock, itemId: itemId })

    return
}
  
const deletedItemService = {
    getAllDeletedItens,
    createDeleteItem,
    verifyItemExist,
}

export default deletedItemService