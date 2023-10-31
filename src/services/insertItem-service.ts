import insertedItemRepository from '@/repositories/insertItem-repository';
import { insertedItemBody } from '@/schemas/insertedItem/InsItemSCHEMA';
import httpStatus from 'http-status';
import { updateInsertedItemBody } from '@/schemas/insertedItem/updateInsItemSCHEMA';
import { notFoundError } from '@/errors/not-found-error';
import itemRepository from '@/repositories/item-repository';

async function getAllInsertedItens(){
    const allItens = await insertedItemRepository.findAllInsertedItens()
    
    const formatedItens = allItens.map(e => {
        return {
            ...e,
            createdBy: e.user
        }
    })

    return formatedItens
}

async function insertItem( userId: number, insertItem: insertedItemBody ) {

    if(insertItem.insertedQuantity <= 0){
        throw httpStatus.NOT_ACCEPTABLE
    }

    const item = await itemRepository.findItemById( insertItem.itemId )

    if (!item) {
        throw notFoundError("O id do item não esta cadastrado")
    }

    await insertedItemRepository.insertItem({ insertedItem: insertItem, userId })

    const newStock = item.stock + insertItem.insertedQuantity

    await itemRepository.updateStock({ newStock, itemId: insertItem.itemId })

    return
}

// async function updateStockService(upInsertItem:updateInsertedItemBody) {
//     await insertedItemRepository.updateStock(upInsertItem)

//     return
// }

async function getInsertedItensByItemId(itemId:number) {
    return insertedItemRepository.findByItensId(itemId)
}

const insertedItemService = {
    getAllInsertedItens,
    insertItem,
    getInsertedItensByItemId,
    // updateStockService
}

export default insertedItemService