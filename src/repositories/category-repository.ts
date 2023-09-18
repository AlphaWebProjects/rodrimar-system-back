import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";

async function findCategoryByName(name: string){
    return prisma.category.findFirst({
        where: {
            name: name
        }
    })
}
async function upsertCategory({ name, userId, categoryId }: { name: string, userId: number, categoryId?: number }) {
    return prisma.category.upsert({
        where: {
            id: categoryId || -1,
        },
        update: {
            name: name,
        },
        create: {
            name: name,
            createdBy: userId
        }
    });
}
async function getAllCategories(){
    return prisma.category.findMany({
        select: {
            id: true,
            name: true,
            isActived: true
        }
    })
}
async function getCategoryById(categoryId: number){
    return prisma.category.findUnique({
        where: {
            id: categoryId
        }
    })
}
async function handleActivedStatus({categoryId, status}: {categoryId: number, status: boolean}){
    return prisma.category.update({
        where: {
            id: categoryId
        },
        data: {
            isActived: status
        }
    })
}
const categoryRepository = {
    findCategoryByName,
    upsertCategory,
    getAllCategories,
    getCategoryById,
    handleActivedStatus
}

export default categoryRepository