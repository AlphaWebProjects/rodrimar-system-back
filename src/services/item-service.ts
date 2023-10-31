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
import { insertedItens } from '@prisma/client';

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
function getAveragePrice(insertedItens: insertedItens[]){
    let totalQuantity = 0;
    let totalValue = 0;
    for (const insertion of insertedItens) {
        totalValue += ( insertion.price * insertion.remainingQuantity )
        totalQuantity += insertion.remainingQuantity
    }
    const result = totalQuantity === 0 || totalValue === 0 ? 0 : (totalValue / totalQuantity)

    return result
}
function getTotalValue(insertedItens: insertedItens[]){
    let totalQuantity = 0;
    let totalValue = 0;
    for (const insertion of insertedItens) {
        totalValue += ( insertion.price * insertion.remainingQuantity )
        totalQuantity += insertion.remainingQuantity
    }

    return {totalQuantity, totalValue}
}
async function getAllItens(){
    const allItens = await itemRepository.findAllItens()  

    const { insertedItens } = allItens[0]
    insertedItens[0].price
    insertedItens[0].remainingQuantity

    const formatedItens = allItens.map(e => {

        const { totalQuantity, totalValue } = getTotalValue(e.insertedItens)
        
        return {
            itemId: e.id,
            name: e.name,
            stock: e.stock,
            updatedAt: e.updatedAt,
            createdAt: e.createdAt,
            description: e.description,
            enable: e.enable,
            lastPrice: e.lastPrice,
            averagePrice: (totalValue / totalQuantity),
            createdBy: {
                userName: e.user.name,
                userRole: e.user.role,
                userEmail: e.user.email
            },
            imageUrl: e.image.imageUrl,
            insertedStock: e.insertedItens.map(e => {
                return {
                    insertedItemPrice: e.price,
                    enable: e.enable,
                    insertedQuantity: e.insertedQuantity,
                    insertedItemRemainingQuantity: e.remainingQuantity,
                    createdAt: e.createdAt,
                    updatedAt: e.updatedAt,
                }
            }),
            subCategoryId: e.subCategoryId,
        } 
    }) 
    return formatedItens
}

async function postItem(userId: number, item:itensBody) {
    const hasName = await itemRepository.findItemWithName(item.name)
    if(hasName){
        throw conflictError("O nome ja está em uso")
    }
    const createNewItem = await itemRepository.createItem(userId,item)
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