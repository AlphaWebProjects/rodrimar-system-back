import { itensBody } from '@/schemas/item/itensSCHEMA';
import { conflictError } from "@/errors/conflict-error";
import itemRepository from "@/repositories/item-repository";
import { enableBody } from '@/schemas/item/enableItemSCHEMA';
import licensePlateRepository from '@/repositories/licensePlate-repository';
import suppliersRepository from '@/repositories/suppliers-repository';
import { createCategoryBody } from '@/schemas/category/createCategory';
import { updateSupplierBody } from '@/schemas/supplier/updateSupplier';
import { createSupplierBody } from '@/schemas/supplier/createSupplier';

async function getAllSuppliers(){
    const allSuppliers = await suppliersRepository.findAllSuppliers()
    const formatBody = allSuppliers?.map(e => {
        return {
            ...e,
            user: {
                userId: e.user.id,
                userName: e.user.name,
                userEmail: e.user.email
            }
        }
    })
    return formatBody
}
async function verifySupplierName(name: string){
    const hasSupplier = await suppliersRepository.getSupplierByName(name)

    if(hasSupplier) {
        throw conflictError("Nome ja esta em uso")
    }
    return
}
async function verifySupplierId(supplierId: number){
    const hasSupplier = await suppliersRepository.getSupplierById(supplierId)

    if(!hasSupplier) {
        throw conflictError("Fornecedor não encontrado")
    }
    return
}
async function createSupplier({body, userId}: {body: createSupplierBody, userId: number}) {
    await suppliersRepository.createSupplier({body, userId})
    return 
}
async function updateSupplier(body: updateSupplierBody) {
    return await suppliersRepository.updateSupplier(body)
}

const suppliersService = {
    getAllSuppliers,
    verifySupplierName,
    createSupplier,
    updateSupplier,
    verifySupplierId
}

export default suppliersService