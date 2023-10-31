import joi from "joi"

export type deletedItemBody = {
    itemId: number,
    price: number,
    deletedQuantity:number,
}

const deletedItemSCHEMA = joi.object<deletedItemBody>({

    itemId: joi.number().required(),
    price:   joi.number().required(),
    deletedQuantity:  joi.number().required(),

})

export {deletedItemSCHEMA}