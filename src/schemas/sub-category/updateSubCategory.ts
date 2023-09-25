import joi from "joi"

export type updateSubCategoryBody = {
    categoryId: number,
    subCategoryId: number,
    newName: string
}

const updateSubCategorySCHEMA = joi.object<updateSubCategoryBody>({
    categoryId: joi.number().integer().positive(),
    subCategoryId: joi.number().integer().positive(),
    newName: joi.string().required(),
})

export {updateSubCategorySCHEMA}