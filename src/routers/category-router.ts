import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter
    .all("/*", authenticateToken)
    .get("/", )
    .post("/", )
    .put("/", )
    .delete("/", )
export { categoryRouter }