import joi from "joi"

export type createCategoryBody = {
    name: string,
}

const createCategorySCHEMA = joi.object<createCategoryBody>({
    name: joi.string().required(),
})

export {createCategorySCHEMA}