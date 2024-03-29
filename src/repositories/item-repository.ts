import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";
import { enableBody } from "@/schemas/item/enableItemSCHEMA";
import { itensBody } from "@/schemas/item/itensSCHEMA";

async function findAllItens(){
    return prisma.item.findMany({
        include: {
            insertedItens: true,
            user: true,
            image: true
        }
    })
}
async function findItemById( itemId: number ){
    return prisma.item.findUnique({
        where: {
            id: itemId
        }
    })
}
async function findItemWithName(name:string){
    return prisma.item.findFirst({
        where: {
            name:name
        }
    })
}
async function createItem(userId:number,item:itensBody) {
    return prisma.item.create({
        data: {
            name: item.name,
            description: item.description,
            lastPrice: item.lastPrice,
            subCategoryId: item.subCategoryId,
            createdBy:userId,
            imageId: item.imageId, 
        }
    })
}
async function updateStatus(Itemenable) {
    const { itemId, enable } = Itemenable;

    const updatedItem = await prisma.item.update({
        where: {
            id: itemId,
        },
        data: {
            enable: enable,
        },
    });

    await prisma.insertedItens.updateMany({
        where: {
            itemId: itemId,
        },
        data: {
            enable: enable,
        },
    });

    return updatedItem;
}
async function updateStock( {itemId, newStock}: {itemId: number, newStock: number} ){
    return prisma.item.update({
        where: {
            id: itemId
        },
        data: {
            stock: newStock
        }
    })
}

const itemRepository = {
    findAllItens,
    createItem,
    findItemWithName,
    updateStatus,
    findItemById,
    updateStock
}

export default itemRepository