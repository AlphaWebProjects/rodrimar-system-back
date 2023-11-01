import { Response } from "express";
import httpStatus from "http-status";
import authService from "@/services/auth-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import { createCategorySCHEMA } from "@/schemas/category/createCategory";
import { UserRoles } from "@prisma/client";
import { updateCategorySCHEMA } from "@/schemas/category/updateCategory";
import { createSubCategorySCHEMA } from "@/schemas/sub-category/createSubCategory";
import { updateSubCategorySCHEMA } from "@/schemas/sub-category/updateSubCategory";
import subCategoryService from "@/services/sub-category-service";
import categoryService from "@/services/category-service";

export async function create(req: AuthenticatedRequest, res: Response){
    try {
        const isValid = createSubCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { name, categoryId } = req.body
        const { userId } = req

        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })
        await subCategoryService.verifySubCategoryName({name, mustHave: false})
        await categoryService.verifyCategoryId(categoryId)

        await subCategoryService.upsertSubCategory({name, userId, categoryId})

        return res.sendStatus(httpStatus.CREATED)  

    } catch (error) {
        console.log(error)
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if(error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function getAll(req: AuthenticatedRequest, res: Response){
    try {        

        const allSubCategoriesData = await subCategoryService.getAllSubCategories()

        return res.send(allSubCategoriesData).status(httpStatus.OK)  

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
        const isValid = updateSubCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { newName, categoryId, subCategoryId } = req.body
        const { userId } = req

        await authService.verifyUserRole({ userId, expectedRole: UserRoles.ADMIN })
        const { name } = await subCategoryService.verifySubCategoryId(subCategoryId)
        
        if(name !== newName){
            await subCategoryService.verifySubCategoryName({name: newName, mustHave: false})
        }
        
        await categoryService.verifyCategoryId(categoryId)

        await subCategoryService.upsertSubCategory({name: newName, userId, categoryId, subCategoryId})

        return res.sendStatus(httpStatus.OK)  

    } catch (error) {
        console.log(error)
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if(error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
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
export async function handleStatus(req: AuthenticatedRequest, res: Response){
    try {        
        const { userId } = req
        const subCategoryId = Number(req.params.subCategoryId);

        if (isNaN(subCategoryId)){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        await authService.verifyUserRole({ userId, expectedRole: UserRoles.ADMIN })
        const { isActived } = await subCategoryService.verifySubCategoryId(subCategoryId)

        await subCategoryService.handleStatus({subCategoryId: subCategoryId, status: !isActived})

        return res.sendStatus(httpStatus.OK)  

    } catch (error) {
        console.log(error)
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if(error.name === "NotFoundError") {
            return res.sendStatus(httpStatus.NOT_FOUND);
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