import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";

async function findCategoryByName(name: string){
    return prisma.category.findFirst({
        where: {
            name: name
        }
    })
}
async function createCategory({name, userId}: {name: string, userId: number}){
    return prisma.category.create({
        data: {
            name: name,
            createdBy: userId
        }
    })
}
async function getAllCategories(){
    return prisma.category.findMany({
        select: {
            id: true,
            name: true,
        }
    })
}
const categoryRepository = {
    findCategoryByName,
    createCategory,
    getAllCategories
}

export default categoryRepository