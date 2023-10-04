import imageRepository from "@/repositories/image-repository";

async function getAllImagesData(){
    const result = await imageRepository.findAll()
    return result
}
async function createImageRef( {imageURL, name}: {imageURL: string, name: string} ){
    const imageData = await imageRepository.createImageRef({ imageURL, name })
    return imageData
}
const imageService = {
    getAllImagesData,
    createImageRef
}
export default imageService