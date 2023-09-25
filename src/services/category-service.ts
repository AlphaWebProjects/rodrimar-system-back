import { UserRoles } from "@prisma/client";
import categoryRepository from "@/repositories/category-repository";
import { conflictError } from "@/errors/conflict-error";
import { notFoundError } from "@/errors/not-found-error";

export type UserRolesType = UserRoles

async function verifyCategoryName({name, mustHave}:{name: string, mustHave: boolean}){
    const hasCategory = await categoryRepository.findCategoryByName(name)

    if( hasCategory && !mustHave){
        throw conflictError("Categoria já cadastrada")
    }

    if( !hasCategory && mustHave){
        throw notFoundError("Categoria não encontrada")
    }

    return hasCategory
}
async function upsertCategory({ name, userId, categoryId }: { name: string, userId: number, categoryId?: number }) {
    await categoryRepository.upsertCategory({name, userId, categoryId})
    return
}
async function getAllCategories(){
    const result = await categoryRepository.getAllCategories()
    const formatedResult = result.map(e => ({
        categoryId: e.id,
        categoryName: e.name,
        isActived: e.isActived,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
    }));
    return formatedResult
}
async function getAllCategoriesData(){
    const result = await categoryRepository.getAllCategoriesData()
    const formatedResult = result.map(e => ({
        categoryId: e.id,
        categoryName: e.name,
        isActived: e.isActived,
        createdBy: {
            userId: e.user.id,
            userName: e.user.name,
            userEmail: e.user.email,
            userRole: e.user.role,
            createdAt: e.user.createdAt,
            updatedAt: e.user.updatedAt,
        },
        allSubCategoriesData: e.subCategory.map(e => ({
            subCategoryId: e.id,
            subCategoryName: e.name,
            isActived: e.isActived,
            createdBy: {
                userId: e.user.id,
                userName: e.user.name,
                userEmail: e.user.email,
                userRole: e.user.role,
                createdAt: e.user.createdAt,
                updatedAt: e.user.updatedAt,
            },
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
        })),
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
    }));
    return formatedResult
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
    getAllCategoriesData,
    verifyCategoryId,
    handleStatus
}

export default categoryService