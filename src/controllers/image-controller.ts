import { Request, Response } from "express";
import httpStatus from "http-status";
import imageService from "@/services/image-service";
import { deleleImageSCHEMA } from "@/schemas/image/deleteImageSCHEMA";
import { format } from "date-fns";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import { AuthenticatedRequestWithPublicURL } from "@/middlewares/uploadImage-middleware";

export async function getAllImages(req: AuthenticatedRequest, res: Response){
    try {        

        const AllImages = await imageService.getAllImagesData()

        return res.send(AllImages).status(httpStatus.OK)
        

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function createImage(req: AuthenticatedRequestWithPublicURL, res: Response){
    try {        

        const imageURL = req.publicImageFileFireBaseURL

        let { name } = req.body

        if (!name) {
            name = format((new Date()), 'dd/MM/yyyy')
        }
        
        await imageService.createImageRef({ imageURL, name })

        return res.sendStatus(httpStatus.CREATED)


    } catch (error) {
        if(error.name === "ConflictError") {
            return res.sendStatus(httpStatus.CONFLICT);
        }
        if (error.name === "BadRequestError") {
            return res.status(httpStatus.BAD_REQUEST).send(error);
        }
        if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
        }
        console.log(error)
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}