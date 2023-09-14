import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";

async function findCategoryByName(name: string){
    return prisma.category.findFirst({
        where: {
            name: name
        }
    })
}
async function upsertCategory({ name, userId }: { name: string, userId: number }) {
    return prisma.category.upsert({
        where: {
            name: name,
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
const categoryRepository = {
    findCategoryByName,
    upsertCategory,
    getAllCategories,
    getCategoryById
}

export default categoryRepository