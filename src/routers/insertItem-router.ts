import { logout, signIn, signUp } from '@/controllers/auth-controller'
import { getInsertedItens, postInsertedItem } from '@/controllers/insertItem-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const insertItemRouter = Router()

insertItemRouter
    .get("/",getInsertedItens)
    .post("/", postInsertedItem)
    .all("/*", authenticateToken)
export { insertItemRouter }