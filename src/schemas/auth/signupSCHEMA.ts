import joi from "joi"

export type signUpBody = {
    email: string,
    name: string,
    role: string,
    password: string,
    passwordVerify: string
}

const signupSCHEMA = joi.object<signUpBody>({

    email: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$')),
    name: joi.string().required().min(2),
    role: joi.string().required().min(4),
    password: joi.string().required().min(5),
    passwordVerify: joi.string().required(),

})

export {signupSCHEMA}