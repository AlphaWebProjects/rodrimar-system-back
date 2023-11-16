import joi from "joi"

export type insertedItemBody = {
    itemId: number,
    price: number, //unityPrice
    insertedQuantity:number, 
    receiptBill?: string,
    receiptBillEmissionDate?: string,
}

const insertedItemSCHEMA = joi.object<insertedItemBody>({

    itemId: joi.number().required(),
    price: joi.number().required(),
    insertedQuantity:  joi.number().positive().integer().required(),
    receiptBill:  joi.string().optional(),
    receiptBillEmissionDate:  joi.string().optional(),

})

export {insertedItemSCHEMA}