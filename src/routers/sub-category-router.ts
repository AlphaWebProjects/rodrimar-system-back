
import { create, getAll, handleStatus, update } from '@/controllers/sub-category-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const subCategoryRouter = Router()

subCategoryRouter
    .all("/*", authenticateToken)
    .get("/", getAll) //MODERATOR
    .post("/", create) //MODERATOR
    .put("/", update) //ADMIN
    .put("/status/:subCategoryId", handleStatus) //ADMIN
export { subCategoryRouter }