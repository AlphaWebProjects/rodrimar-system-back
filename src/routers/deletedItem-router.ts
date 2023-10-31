import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const deletedItemRouter = Router()

deletedItemRouter
.all("/*", authenticateToken)
    .get("", )
    .post("", )
    .put("", )
export { deletedItemRouter }