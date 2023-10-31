import { createDeletedItem, getDeletedItens } from '@/controllers/deletedItem-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const deletedItemRouter = Router()

deletedItemRouter
.all("/*", authenticateToken)
    .get("", getDeletedItens)
    .post("", createDeletedItem)

export { deletedItemRouter }