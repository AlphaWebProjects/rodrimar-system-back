import { itensBody } from '@/schemas/item/itensSCHEMA';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { signUpBody } from "@/schemas/auth/signupSCHEMA"
import { unauthorizedError } from "@/errors/unauthorized-error"
import { badRequestError } from "@/errors/bad-request-erros";
import { conflictError } from "@/errors/conflict-error";
import { notFoundError } from "@/errors/not-found-error";
import { signInBody } from "@/schemas/auth/signInSCHEMA";
import authRepository from "@/repositories/auth-repository";
import itemRepository from "@/repositories/item-repository";
import { enableBody } from '@/schemas/item/enableItemSCHEMA';

async function verifyUser(body: signUpBody){
    if (body.password !== body.passwordVerify){
        throw badRequestError("Senhas diferentes")
    }
    const hasUser = await authRepository.findUserWithEmail(body.email)
    
    if(hasUser){
        throw conflictError("Email ja cadastrado")
    }   
    return
}

async function getAllItens(userId: number){
    const allItens = await itemRepository.findAllItens()    
    return allItens
}

async function postItem(userId: number, item:itensBody) {
    const hasName = await itemRepository.findItemWithName(item.name)
    if(hasName){
        throw conflictError("O nome ja está em uso")
    }
    const createNewItem = await itemRepository.createItem(item)
}



async function updateItemStatus(enable:enableBody) {
    return await itemRepository.updateStatus(enable)
}


const itemService = {
    getAllItens,
    postItem,
    verifyUser,
    updateItemStatus
}

export default itemService