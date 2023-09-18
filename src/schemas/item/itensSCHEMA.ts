import joi from "joi"

export type itensBody = {
    name: string,
    description:   string,
    lastPrice: number,
    imageId: number,
    subCategoryId: number
}

const itemSCHEMA = joi.object<itensBody>({

    name: joi.string().required().min(2),
    description:   joi.string().required().min(2),
    lastPrice: joi.number().required(),
    imageId:  joi.number().required(),
    subCategoryId:  joi.number().required()

})

export {itemSCHEMA}