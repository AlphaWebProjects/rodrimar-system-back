import { Response } from "express";
import httpStatus from "http-status";
import authService from "@/services/auth-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import { createCategorySCHEMA } from "@/schemas/category/createCategory";
import { UserRoles } from "@prisma/client";
import categoryService from "@/services/category-service";
import { updateCategorySCHEMA } from "@/schemas/category/updateCategory";

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
        await categoryService.verifyCategoryName({name, mustHave: false})

        await categoryService.upsertCategory({name, userId})

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
export async function getAll(req: AuthenticatedRequest, res: Response){
    try {        

        const allCategoriesData = await categoryService.getAllCategories()

        return res.send(allCategoriesData).status(httpStatus.OK)  

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
export async function update(req: AuthenticatedRequest, res: Response){
    try {
        const isValid = updateCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { newName, categoryId } = req.body
        const { userId } = req

        await authService.verifyUserRole({ userId, expectedRole: UserRoles.ADMIN })
        await categoryService.verifyCategoryName({name: newName, mustHave: false})
        await categoryService.verifyCategoryId(categoryId)

        await categoryService.upsertCategory({name: newName, userId})

        return res.sendStatus(httpStatus.OK)  

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
