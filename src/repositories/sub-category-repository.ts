import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";

async function findSubCategoryByName(name: string){
    return prisma.subCategory.findFirst({
        where: {
            name: name
        }
    })
}
async function upsertSubCategory({ name, userId, subCategoryId, categoryId }: { name: string, userId: number, subCategoryId?: number, categoryId: number }) {
    return prisma.subCategory.upsert({
        where: {
            id: subCategoryId || -1,
        },
        update: {
            name: name,
            categoryId: categoryId
        },
        create: {
            name: name,
            categoryId: categoryId,
            createdBy: userId
        }
    });
}
async function getAllSubCategories(){
    return prisma.subCategory.findMany({
        select: {
            id: true,
            name: true,
            isActived: true,
            category: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
}
async function getSubCategoryById(subCategoryId: number){
    return prisma.subCategory.findUnique({
        where: {
            id: subCategoryId
        }
    })
}
async function handleActivedStatus({subCategoryId, status}: {subCategoryId: number, status: boolean}){
    return prisma.subCategory.update({
        where: {
            id: subCategoryId
        },
        data: {
            isActived: status
        }
    })
}
const subCategoryRepository = {
    findSubCategoryByName,
    upsertSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    handleActivedStatus
}

export default subCategoryRepository