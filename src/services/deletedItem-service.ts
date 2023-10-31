import insertedItemRepository from '@/repositories/insertItem-repository';
import { insertedItemBody } from '@/schemas/insertedItem/InsItemSCHEMA';
import httpStatus from 'http-status';
import { updateInsertedItemBody } from '@/schemas/insertedItem/updateInsItemSCHEMA';
import { notFoundError } from '@/errors/not-found-error';
import itemRepository from '@/repositories/item-repository';
import deletedItemRepository from '@/repositories/deletedItem-repository';
import { deletedItemBody } from '@/schemas/deletedItem/deletedItemBody';

async function getAllDeletedItens(){
    const allItens = await deletedItemRepository.findAllDeletedItens()
    
    const formatedItens = allItens.map(e => {
        return {
            deletedId: e.id,
            deletedQuantity: e.deletedQuantity,
            createdBy: e.user,
            deletedItem: e.insertedItem,
            updatedAt: e.updatedAt,
            createdAt: e.createdAt
        }
    })

    return formatedItens
}

async function deleteItem({ userId: number, deletedItemBody: deletedItemBody }) {

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

async function updateStockService(upInsertItem:updateInsertedItemBody) {
    await insertedItemRepository.updateStock(upInsertItem)

    return
}

async function getInsertedItensByItemId(itemId:number) {
    return insertedItemRepository.findByItemId(itemId)
}

const deletedItemService = {
    getAllDeletedItens,
    insertItem,
    getInsertedItensByItemId,
    updateStockService
}

export default deletedItemService