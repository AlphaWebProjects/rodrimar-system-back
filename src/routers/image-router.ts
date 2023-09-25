import Multer from '@/config/multerconfig'
import { uploadImage } from '@/middlewares/uploadImage-middleware'
import { Router } from 'express'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { createImage, getAllImages } from '@/controllers/image-controller'

const imageRouter = Router()

imageRouter

    .all("/*", authenticateToken)
    .get("", getAllImages)
    .post("", Multer.single('imageFile'), uploadImage, createImage)
    
export { imageRouter }