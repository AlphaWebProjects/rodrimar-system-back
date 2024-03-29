import { Request, Response } from "express";
import httpStatus from "http-status";
import { itemSCHEMA, itensBody } from "@/schemas/item/itensSCHEMA";
import authService from "@/services/auth-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import itemService from "@/services/item-service";
import { UserRoles } from "@prisma/client";
import { enableBody, enableSCHEMA } from "@/schemas/item/enableItemSCHEMA";



export async function getItens(req: AuthenticatedRequest, res: Response){

    const { userId } = req
    
    try {
        await authService.verifyUserRole({ userId, expectedRole: UserRoles.VISIT })
        const itens = await itemService.getAllItens()
        return res.send(itens)

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

export async function postItens(req: AuthenticatedRequest, res: Response) {
    try {
        const item: itensBody = req.body
        const userId = Number(req.query.userId);
        const {error} = itemSCHEMA.validate(item, {abortEarly: false})
        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })

        if (error) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
          }

          const itemPost = await itemService.postItem(Number(userId), item)

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

export async function updateEnableStatus(req: AuthenticatedRequest, res: Response) {
    try {
        const enable:enableBody = req.body
        const userId = Number(req.query.userId);
        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })
        const {error} = enableSCHEMA.validate(enable, {abortEarly: false})
        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })

        if (error) {
            console.log('caiu aqui')
            return res.sendStatus(httpStatus.BAD_REQUEST);
          }
          const enableItem = await itemService.updateItemStatus(enable)

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
