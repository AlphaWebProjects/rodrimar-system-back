import { UserRoles } from "@prisma/client";
import categoryRepository from "@/repositories/category-repository";
import { conflictError } from "@/errors/conflict-error";
import { notFoundError } from "@/errors/not-found-error";

export type UserRolesType = UserRoles

async function verifyCategory({name, mustHave}:{name: string, mustHave: boolean}){
    const hasCategory = categoryRepository.findCategoryByName(name)

    if( hasCategory && !mustHave){
        throw conflictError("Categoria já cadastrada")
    }

    if( !hasCategory && mustHave){
        throw notFoundError("Categoria não encontrada")
    }

    return hasCategory
}

async function createCategory({name, userId}: {name: string, userId: number}){
    await categoryRepository.createCategory({name, userId})
}

const categoryService = {
    verifyCategory,
    createCategory
}

export default categoryService