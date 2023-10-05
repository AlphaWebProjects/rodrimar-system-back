import { prisma } from "@/config";

async function findAllLicensePlates(){
    return prisma.licensePlate.findMany()
}

async function findByLicense(license:string){
    return prisma.licensePlate.findFirst({
        where: {
           license
        }
    })
}

async function createLicensePlate(license:string) {
    return prisma.licensePlate.create({
        data: {
            license
          }
    })
}



async function updateLicensePlate(Itemenable) {
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



const licensePlateRepository = {
    findAllLicensePlates,
    findByLicense,
    createLicensePlate,
    updateLicensePlate
}

export default licensePlateRepository