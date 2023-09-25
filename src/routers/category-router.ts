import { getAll, create, handleStatus, update, getAllCategoriesData } from '@/controllers/category-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter
    .all("/*", authenticateToken)
    .get("/", getAll) //MODERATOR
    .get("/alldata", getAllCategoriesData) //MODERATOR
    .post("/", create) //MODERATOR
    .put("/", update) //ADMIN
    .put("/status/:categoryId", handleStatus) //ADMIN
export { categoryRouter }