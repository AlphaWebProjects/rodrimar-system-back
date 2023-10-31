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
            deletedBy: e.user,
            deletedItem: e.insertedItem,
            updatedAt: e.updatedAt,
            createdAt: e.createdAt
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
async function createDeleteItem({ userId, itemId, deletedQuantity, newStock}: { userId: number, itemId: number, deletedQuantity: number, newStock: number}) {

    const insertedItens = await insertedItemRepository.findAvailableByItensId(itemId)

    let remainingToDelete = deletedQuantity

    for (const insertion of insertedItens) {

        if (remainingToDelete <= 0) {
            break;
        }
        
        let deletedAmountFromThisInsertion = remainingToDelete >= insertion.insertedQuantity ? insertion.insertedQuantity : remainingToDelete

        await insertedItemRepository.updateInsertStock({insertId: insertion.id, remainingQuantity: insertion.remainingQuantity - deletedAmountFromThisInsertion })
       
        await deletedItemRepository.createDeleteItem({insertId: insertion.id, deletedQuantity: deletedAmountFromThisInsertion, deletedBy: userId})

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