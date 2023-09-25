import joi from "joi"

export type deleteImageBody = {
    imageId: number
}

const deleleImageSCHEMA = joi.object<deleteImageBody>({

    imageId: joi.number().required(),

})

export {deleleImageSCHEMA}