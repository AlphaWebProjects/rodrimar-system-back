import { logout, signIn, signUp } from '@/controllers/auth-controller'
import { getItens } from '@/controllers/item-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const itemRouter = Router()

itemRouter
    .post("/", signUp)
    .get("/", getItens)
    .all("/*", authenticateToken)
    .delete("/delete", logout)
export { itemRouter }