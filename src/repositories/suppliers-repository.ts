import { prisma } from "@/config";
import { createSupplierBody } from "@/schemas/supplier/createSupplier";
import { updateSupplierBody } from "@/schemas/supplier/updateSupplier";

async function findAllSuppliers(){
    return prisma.supplier.findMany({
        include: {
            user: true
        }
    })
}
async function getSupplierByName(name: string){
    return prisma.supplier.findFirst({
        where: {
            name: name
        }
    })
}
async function getSupplierById(supplierId: number){
    return prisma.supplier.findFirst({
        where: {
            id: supplierId
        }
    })
}
async function createSupplier({body, userId}: {body: createSupplierBody, userId: number}){
    return prisma.supplier.create({
        data: {
            name: body.name,
            createdBy: userId
        }
    })
}
async function updateSupplier(body: updateSupplierBody){
    return prisma.supplier.update({
        where: {
            id: body.supplierId
        },
        data: {
            name: body.name
        }
    })
}



const suppliersRepository = {
    findAllSuppliers,
    getSupplierByName,
    createSupplier,
    updateSupplier,
    getSupplierById
}

export default suppliersRepository