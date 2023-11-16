import joi from "joi"

export type updateSupplierBody = {
    name: string
    supplierId: number
}

const updateSupplierBodySCHEMA = joi.object<updateSupplierBody>({
    name: joi.string().required().min(2),
    supplierId: joi.number().integer().positive(),
})

export {updateSupplierBodySCHEMA}
