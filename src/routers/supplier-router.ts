import { createSupplier, getSuppliers, updateSupplier } from '@/controllers/supplier-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const supplierRouter = Router()

supplierRouter
    .all("/*", authenticateToken)
    .post("/", createSupplier)
    .get("/", getSuppliers)
    .put("/", updateSupplier)
export { supplierRouter }