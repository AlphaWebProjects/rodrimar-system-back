import { Response } from "express";
import httpStatus from "http-status";
import authService from "@/services/auth-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import { createCategorySCHEMA } from "@/schemas/category/createCategory";
import { UserRoles } from "@prisma/client";
import categoryService from "@/services/category-service";

export async function create(req: AuthenticatedRequest, res: Response){
    try {
        const isValid = createCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { name } = req.body
        const { userId } = req

        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })
        await categoryService.verifyCategory({name, mustHave: false})

        await categoryService.createCategory({name, userId})

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
