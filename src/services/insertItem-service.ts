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
import { updateInsertedItemBody } from '@/schemas/insertedItem/updateInsItemSCHEMA';

async function getAllInsertedItens(){
    const allItens = await insertedItemRepository.findAllInsertedItens()
    return allItens
}

async function inserItem(userId:number, inserItem: insertedItemBody) {
    if(inserItem.insertedQuantity < 0){
        throw httpStatus.NOT_ACCEPTABLE
    }
    await insertedItemRepository.insertItem(userId,inserItem)
    return
}

async function updateStockService(upInsertItem:updateInsertedItemBody) {
    await insertedItemRepository.updateStock(upInsertItem)

    return
}

async function getInsertedItensByItemId(itemId:number) {
    return insertedItemRepository.findByItemId(itemId)
}

const insertedItemService = {
    getAllInsertedItens,
    inserItem,
    getInsertedItensByItemId,
    updateStockService
}

export default insertedItemService