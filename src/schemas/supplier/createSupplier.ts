import joi from "joi"

export type createSupplierBody = {
    name: string,

}

const createSupplierBodySCHEMA = joi.object<createSupplierBody>({
    name: joi.string().required().min(2),
})

export {createSupplierBodySCHEMA}