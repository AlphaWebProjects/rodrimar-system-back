import joi from "joi"

export type createSubCategoryBody = {
    name: string,
    categoryId: number
}

const createSubCategorySCHEMA = joi.object<createSubCategoryBody>({
    categoryId: joi.number().integer().positive(),
    name: joi.string().required(),
})

export {createSubCategorySCHEMA}