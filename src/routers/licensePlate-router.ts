import { getLicensePlates, postLicensePlates, updateLicensePlates } from '@/controllers/licensePlate-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const licensePlateRouter = Router()

licensePlateRouter
    .all("/*", authenticateToken)
    .post("/", postLicensePlates)
    .get("/", getLicensePlates)
    .put("/status",updateLicensePlates)
export { licensePlateRouter }