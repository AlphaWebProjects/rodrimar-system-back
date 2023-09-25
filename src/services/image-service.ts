import imageRepository from "@/repositories/image-repository";

async function getAllImagesData(){
    const result = await imageRepository.findAll()
    return result
}
async function createImageRef( {imageURL, name}: {imageURL: string, name: string} ){
    await imageRepository.createImageRef({ imageURL, name })
    return 
}
const imageService = {
    getAllImagesData,
    createImageRef
}
export default imageService