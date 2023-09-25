import { prisma } from "@/config";

async function findAll(){
    return prisma.image.findMany({
        select: {
            id: true,
            imageUrl: true,
            imageName: true
        }
    });
}
async function findById( imageId: number ){
    return prisma.image.findUnique({
        where: {
            id: imageId
        }
    });
}
async function createImageRef( {imageURL, name}: {imageURL: string, name: string} ){
    return prisma.image.create({
       data: {
        imageUrl: imageURL,
        imageName: name
       }
    });
}
async function deleteImageRef( imageURL: number ){
    return prisma.image.delete({
       where: {
        id: imageURL
       }
    });
}

const imageRepository = {
    findAll,
    createImageRef,
    findById,
    deleteImageRef
}

export default imageRepository