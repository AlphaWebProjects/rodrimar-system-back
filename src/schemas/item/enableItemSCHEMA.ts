import joi from "joi"

export type enableBody = {
    itemId: number,
    enable:boolean
}

const enableSCHEMA = joi.object<enableBody>({
    
   itemId:joi.number().required(),
   enable:joi.boolean().required()

})

export {enableSCHEMA}