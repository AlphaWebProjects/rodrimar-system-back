import { logout, signIn, signUp } from '@/controllers/auth-controller'
import { getItens, postItens, updateEnableStatus } from '@/controllers/item-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const itemRouter = Router()

itemRouter
    .all("/*", authenticateToken)
    .post("/", postItens)
    .get("/", getItens)
    .put("/status",updateEnableStatus)
    .delete("/delete", logout)
export { itemRouter }