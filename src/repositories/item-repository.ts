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



const itemRepository = {
    findAllItens,
    createItem,
    findItemWithName,
    updateStatus
}

export default itemRepository