import { getAll, handleStatus, update } from '@/controllers/category-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { create } from 'domain'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter
    .all("/*", authenticateToken)
    .get("/", getAll) //MODERATOR
    .post("/", create) //MODERATOR
    .put("/", update) //ADMIN
    .put("/status/:categoryId", handleStatus) //ADMIN
export { categoryRouter }