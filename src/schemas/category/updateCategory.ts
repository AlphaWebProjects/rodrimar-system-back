import joi from "joi"

export type updateCategoryBody = {
    categoryId: number,
    newName: string
}

const updateCategorySCHEMA = joi.object<updateCategoryBody>({
    categoryId: joi.number().integer().positive(),
    newName: joi.string().required(),
})

export {updateCategorySCHEMA}