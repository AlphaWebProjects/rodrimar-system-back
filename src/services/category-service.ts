import { UserRoles } from "@prisma/client";
import categoryRepository from "@/repositories/category-repository";
import { conflictError } from "@/errors/conflict-error";
import { notFoundError } from "@/errors/not-found-error";

export type UserRolesType = UserRoles

async function verifyCategoryName({name, mustHave}:{name: string, mustHave: boolean}){
    const hasCategory = categoryRepository.findCategoryByName(name)

    if( hasCategory && !mustHave){
        throw conflictError("Categoria já cadastrada")
    }

    if( !hasCategory && mustHave){
        throw notFoundError("Categoria não encontrada")
    }

    return hasCategory
}
async function upsertCategory({name, userId}: {name: string, userId: number}){
    await categoryRepository.upsertCategory({name, userId})
    return
}
async function getAllCategories(){
    const result = await categoryRepository.getAllCategories()
    return result
}
async function verifyCategoryId(categoryId: number){
    const hasCategory = await categoryRepository.getCategoryById(categoryId)

    if (!hasCategory){
        throw notFoundError("Categoria não encontrada")
    }

    return hasCategory
}
async function handleStatus({categoryId, status}: {categoryId: number, status: boolean}){
    await categoryRepository.handleActivedStatus({ categoryId, status })
    return 
}
const categoryService = {
    verifyCategoryName,
    upsertCategory,
    getAllCategories,
    verifyCategoryId,
    handleStatus
}

export default categoryService