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
import insertedItemRepository from '@/repositories/insertItem-repository';
import { insertedItemBody } from '@/schemas/insertedItem/InsItemSCHEMA';
import httpStatus from 'http-status';

async function getAllInsertedItens(){
    const allItens = await insertedItemRepository.findAllInsertedItens()
    return allItens
}

async function inserItem(userId:number, inserItem: insertedItemBody) {
    if(inserItem.insertedQuantity < 0){
        throw httpStatus.NOT_ACCEPTABLE
    }
    await insertedItemRepository.insertItem(inserItem)
    return
}

async function updateStockService(id:number) {
    await insertedItemRepository.updateStock(id)

    return
}



const insertedItemService = {
    getAllInsertedItens,
    inserItem
}

export default insertedItemService