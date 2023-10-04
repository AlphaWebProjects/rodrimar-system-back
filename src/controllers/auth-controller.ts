import { Request, Response } from "express";
import httpStatus from "http-status";
import { signupSCHEMA } from "@/schemas/auth/signupSCHEMA";
import { signInSCHEMA } from "@/schemas/auth/signInSCHEMA";
import authService from "@/services/auth-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import { UserRoles } from "@prisma/client";

export async function signUp(req: Request, res: Response){
    try {
        const isValid = signupSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { email, name, password, passwordVerify } = req.body

        await authService.verifyUser({ email, name, password, passwordVerify })
        await authService.createNewUser({ email, name, password })

        return res.sendStatus(httpStatus.CREATED)  

    } catch (error) {
        console.log(error)
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function signIn(req: Request, res: Response) {
    try {

        const isValid = signInSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { email, password } = req.body
        
        const { userId, name } = await authService.verifyAccees({ email, password })
        
        const token = await authService.createSession( userId )

        return res.send({token: token, email: email, name: name}).status(httpStatus.OK)
        

    } catch (error) {

        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
          }
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
          }
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "ForbiddenError") {
            return res.sendStatus(httpStatus.FORBIDDEN);
        }
          
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function logout(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req
        
        await authService.deleteSession(userId)

        return res.sendStatus(httpStatus.OK)   

    } catch (error) {

        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
          }
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
          }
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "ForbiddenError") {
            return res.sendStatus(httpStatus.FORBIDDEN);
        }
          
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function changeRole(req: AuthenticatedRequest, res: Response) {
    try {
        const { userId } = req

        const { userIdChanged, role } = req.body

        if(!userIdChanged || !role){
            res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const roleRef = {
            "ADMIN": UserRoles.ADMIN,
            "MODERATOR": UserRoles.MODERATOR,
            "VISIT": UserRoles.VISIT,
            "admin": UserRoles.ADMIN,
            "moderator": UserRoles.MODERATOR,
            "visit": UserRoles.VISIT,
            "Admin": UserRoles.ADMIN,
            "Moderator": UserRoles.MODERATOR,
            "Visit": UserRoles.VISIT,
        }

        if(!roleRef[role]){
            res.send("Cargo invalido").status(httpStatus.BAD_REQUEST)
        }
        
        await authService.verifyUserRole({ userId, expectedRole: UserRoles.ADMIN })
        await authService.verifyUserExist(userIdChanged)
        await authService.changeUserRole({userId: userIdChanged, role: roleRef[role]})

        return res.sendStatus(httpStatus.OK)   

    } catch (error) {

        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
          }
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
          }
        if (error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "ForbiddenError") {
            return res.sendStatus(httpStatus.FORBIDDEN);
        }
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}