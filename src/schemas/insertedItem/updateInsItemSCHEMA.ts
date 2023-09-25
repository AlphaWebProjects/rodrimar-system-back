import joi from "joi"

export type updateInsertedItemBody = {
    id:number,
    itemId?:number,
    price?: number,
    insertedQuantity?:number,
    stock?:number
}

const updateInsItemSCHEMA = joi.object<updateInsertedItemBody>({
    id: joi.number().required(),
    itemId: joi.number(),
    price:   joi.number(),
    insertedQuantity:  joi.number(),
    stock:joi.number()
})

export {updateInsItemSCHEMA}