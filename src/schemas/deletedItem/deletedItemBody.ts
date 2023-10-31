import joi from "joi"

export type deletedItemBody = {
    itemId: number,
    deletedQuantity:number,
    licenseId: number
}

const deletedItemSCHEMA = joi.object<deletedItemBody>({

    itemId: joi.number().required(),
    deletedQuantity:  joi.number().positive().integer().required(),

})

export {deletedItemSCHEMA}