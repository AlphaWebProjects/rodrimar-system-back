import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";
import { enableBody } from "@/schemas/item/enableItemSCHEMA";
import { itensBody } from "@/schemas/item/itensSCHEMA";

async function findAllItens(){
    return prisma.item.findMany()
}

async function findItemWithName(name:string){
    return prisma.item.findFirst({
        where: {
            name:name
        }
    })
}

async function createItem(item:itensBody) {
    return prisma.item.create({
        data: {
            name: item.name,
            description: item.description,
            lastPrice: item.lastPrice,
            subCategoryId: item.subCategoryId,
            imageId: item.imageId, 
          }
    })
}

async function createSession({userId, token}: {userId: number, token: string}){
    return prisma.session.create({
        data: {
            userId: userId,
            token: token
        }
    })
}
async function findSession(token: string){
    return prisma.session.findFirst({
        where: {
            token: token
        }
    })
}
async function deleteSession(userId: number){
    return prisma.session.deleteMany({
        where: {
            userId: userId
        }
    })
}

async function updateStatus(Itemenable:enableBody) {
    const { itemId, enable } = Itemenable;

    const updatedItem = await prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            enable: enable,
        },
    });

    return updatedItem;
}

const itemRepository = {
    findAllItens,
    createItem,
    createSession,
    findSession,
    deleteSession,
    findItemWithName,
    updateStatus
}

export default itemRepository