import { getAll } from '@/controllers/category-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { create } from 'domain'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter
    .all("/*", authenticateToken)
    .get("/", getAll)
    .post("/", create)
    .put("/", )
    .delete("/", )
export { categoryRouter }