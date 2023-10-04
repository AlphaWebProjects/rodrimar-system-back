import { prisma } from "@/config";
import { signUpBody } from "@/schemas/auth/signupSCHEMA";
import { UserRolesType } from "@/services/auth-service";

async function findUserWithEmail(email: string){
    return prisma.user.findFirst({
        where: {
            email: email
        }
    })
}
async function createUser(body: Omit<signUpBody, "passwordVerify">){
    return prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
            password: body.password
        }
    })
}
async function createSession({userId, token}: {userId: number, token: string}){
    return prisma.session.create({
        data: {
            userId: userId,
            token: token
        }
    })
}
async function findSession(token: string){
    return prisma.session.findFirst({
        where: {
            token: token
        }
    })
}
async function deleteSession(userId: number){
    return prisma.session.deleteMany({
        where: {
            userId: userId
        }
    })
}
async function findUserById(userId: number){
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}
async function changeUserRole({userId, role}:{userId: number, role: UserRolesType}){
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role: role
        }
    })
}
const authRepository = {
    findUserWithEmail,
    createUser,
    createSession,
    findSession,
    deleteSession,
    findUserById,
    changeUserRole
}

export default authRepository