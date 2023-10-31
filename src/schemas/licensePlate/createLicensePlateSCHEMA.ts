import joi from "joi"

export type licensePlateBody = {
    name: string
}

const licensePlateSCHEMA = joi.object<licensePlateBody>({
    name: joi.string().required().min(2),
})

export {licensePlateSCHEMA}