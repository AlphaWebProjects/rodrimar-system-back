import { getByItemId, getInsertedItens, postInsertedItem, putInsertedItem } from '@/controllers/insertItem-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const insertItemRouter = Router()

insertItemRouter
    .get("/",getInsertedItens)
    .get("/itemId",getByItemId)
    .post("/", postInsertedItem)
    .put("/", putInsertedItem)
    .all("/*", authenticateToken)
export { insertItemRouter }