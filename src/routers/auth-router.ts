import { changeRole, logout, signIn, signUp } from '@/controllers/auth-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const authRouter = Router()

authRouter
    .post("/sign-up", signUp)
    .post("/sign-in", signIn)
    .all("/*", authenticateToken)
    .put("/role", changeRole)
    .delete("/logout", logout)
export { authRouter }