import { getAll, update } from '@/controllers/category-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { create } from 'domain'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter
    .all("/*", authenticateToken)
    .get("/", getAll) //MODERATOR
    .post("/", create) //MODERATOR
    .put("/", update) //ADMIN
    .delete("/", )
export { categoryRouter }