import { UserRoles } from "@prisma/client";

import { conflictError } from "@/errors/conflict-error";
import { notFoundError } from "@/errors/not-found-error";
import subCategoryRepository from "@/repositories/sub-category-repository";

export type UserRolesType = UserRoles

async function verifySubCategoryName({name, mustHave}:{name: string, mustHave: boolean}){
    const hasSubCategory = await subCategoryRepository.findSubCategoryByName(name)

    if( hasSubCategory && !mustHave){
        throw conflictError("Subcategoria já cadastrada")
    }

    if( !hasSubCategory && mustHave){
        throw notFoundError("Subcategoria não encontrada")
    }

    return hasSubCategory
}
async function upsertSubCategory({ name, userId, categoryId, subCategoryId }: { name: string, userId: number, categoryId: number, subCategoryId?: number }) {
    await subCategoryRepository.upsertSubCategory({name, userId, categoryId, subCategoryId})
    return
}
async function getAllSubCategories(){
    const result = await subCategoryRepository.getAllSubCategories()
    const formatedResult = result.map(e => ({
        mainCategoryId: e?.category?.id, 
        mainCategoryName: e?.category?.name,
        subCategoryId: e?.id,
        isActived: e?.isActived,
        subCategoryName: e?.name
    }));
    return formatedResult
}
async function verifySubCategoryId(subCategoryId: number){
    const hasSubCategory = await subCategoryRepository.getSubCategoryById(subCategoryId)

    if (!hasSubCategory){
        throw notFoundError("Subcategoria não encontrada")
    }

    return hasSubCategory
}
async function handleStatus({subCategoryId, status}: {subCategoryId: number, status: boolean}){
    await subCategoryRepository.handleActivedStatus({ subCategoryId, status })
    return 
}
const subCategoryService = {
    verifySubCategoryName,
    upsertSubCategory,
    getAllSubCategories,
    verifySubCategoryId,
    handleStatus
}

export default subCategoryService