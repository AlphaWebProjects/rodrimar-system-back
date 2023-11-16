import { Request, Response } from "express";
import httpStatus from "http-status";
import { itemSCHEMA, itensBody } from "@/schemas/item/itensSCHEMA";
import authService from "@/services/auth-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import itemService from "@/services/item-service";
import { UserRoles } from "@prisma/client";
import { enableBody, enableSCHEMA } from "@/schemas/item/enableItemSCHEMA";
import licensePlateService from "@/services/licensePlate-service";
import suppliersService from "@/services/suppliers-service";
import { createSupplierBodySCHEMA } from "@/schemas/supplier/createSupplier";
import { updateSupplierBodySCHEMA } from "@/schemas/supplier/updateSupplier";

export async function getSuppliers(req: AuthenticatedRequest, res: Response){
    const { userId } = req
    try {
        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })
        const suppliers = await suppliersService.getAllSuppliers()
        return res.send(suppliers).status(httpStatus.OK)

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
export async function createSupplier(req: AuthenticatedRequest, res: Response) {
    try {
       
        const { userId } = req

        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })

        const isValid = createSupplierBodySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { name } = req.body

        await suppliersService.verifySupplierName(name)

        await suppliersService.createSupplier({body: {name}, userId})

        res.sendStatus(httpStatus.CREATED)

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
export async function updateSupplier(req: AuthenticatedRequest, res: Response) {
    try {
       
        const { userId } = req

        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })

        const isValid = updateSupplierBodySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            console.log(isValid.error)
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { name, supplierId } = req.body

        await suppliersService.verifySupplierName(name)
        await suppliersService.verifySupplierId(supplierId)

        await suppliersService.updateSupplier({name, supplierId})

        res.sendStatus(httpStatus.OK)

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
