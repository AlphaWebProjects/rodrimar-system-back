import { logout, signIn, signUp } from '@/controllers/auth-controller'
import { getItens, postItens } from '@/controllers/item-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const itemRouter = Router()

itemRouter
    .post("/", postItens)
    .get("/", getItens)
    .all("/*", authenticateToken)
    .put("/enable")
    .delete("/delete", logout)
export { itemRouter }