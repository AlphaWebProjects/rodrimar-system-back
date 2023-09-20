import joi from "joi"

export type insertedItemBody = {
    itemId: number,
    price: number,
    insertedQuantity:number,
}

const insertedItemSCHEMA = joi.object<insertedItemBody>({

    itemId: joi.number().required(),
    price:   joi.number().required(),
    insertedQuantity:  joi.number().required(),

})

export {insertedItemSCHEMA}