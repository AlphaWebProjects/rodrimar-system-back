import { getByItemId, getInsertedItens, postInsertedItem } from '@/controllers/insertItem-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const insertItemRouter = Router()

insertItemRouter
.all("/*", authenticateToken)
    .get("/",getInsertedItens)
    .get("/itemId",getByItemId)
    .post("/", postInsertedItem)
    //.put("/", putInsertedItem)
export { insertItemRouter }