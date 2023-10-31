import { Response } from "express";
import httpStatus from "http-status";
import authService from "@/services/auth-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import { UserRoles } from "@prisma/client";
import insertedItemRepository from "@/repositories/insertItem-repository";
import { insertedItemBody, insertedItemSCHEMA } from "@/schemas/insertedItem/InsItemSCHEMA";
import insertedItemService from "@/services/insertItem-service";
import { updateInsItemSCHEMA, updateInsertedItemBody } from "@/schemas/insertedItem/updateInsItemSCHEMA";
import deletedItemService from "@/services/deletedItem-service";
import { deletedItemBody } from "@/schemas/deletedItem/deletedItemBody";
import itemRepository from "@/repositories/item-repository";

export async function getDeletedItens(req: AuthenticatedRequest, res: Response) {
    try {

        const { userId } = req

        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })

        const itens = await deletedItemService.getAllDeletedItens()
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
export async function postDeletedItem(req: AuthenticatedRequest, res: Response) {
    try {

        const { userId, body }: {userId: number, body: deletedItemBody} = req

        const { error } = insertedItemSCHEMA.validate(body, {abortEarly: false})
        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })

        if (error) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        const item = await itemRepository.findItemById(body.itemId)

        if (!item) {
            res.sendStatus(httpStatus.NOT_FOUND)
        }
        if (item.stock < body.deletedQuantity) {
            res.sendStatus(httpStatus.BAD_REQUEST)
        }

        await deletedItemService.deleteItem({...body, userId})

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

export async function putInsertedItem(req: AuthenticatedRequest, res: Response) {
    try {
        const upInsertItem: updateInsertedItemBody= req.body
        const userId = Number(req.query.userId);
        console.log(userId)
        const {error} = updateInsItemSCHEMA.validate(upInsertItem, {abortEarly: false})
        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })
        await insertedItemService.updateStockService(upInsertItem)

        if (error) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
          }


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
export async function getByItemId(req: AuthenticatedRequest, res: Response) {
    const userId = Number(req.query.userId);
    const {itemId }= req.body
    try {
        await authService.verifyUserRole({ userId, expectedRole: UserRoles.MODERATOR })
        const itens = await insertedItemRepository.findByItemId(Number(itemId))
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