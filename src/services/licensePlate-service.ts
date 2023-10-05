import { itensBody } from '@/schemas/item/itensSCHEMA';
import { conflictError } from "@/errors/conflict-error";
import itemRepository from "@/repositories/item-repository";
import { enableBody } from '@/schemas/item/enableItemSCHEMA';
import licensePlateRepository from '@/repositories/licensePlate-repository';



async function getAllLicensePlates(userId: number){
    const allLicenses = await licensePlateRepository.findAllLicensePlates()
    return allLicenses
}

async function postLicensePlate(license:string) {
    const hasLicense = await licensePlateRepository.findByLicense(license)
    if(hasLicense){
        throw conflictError("O nome ja está em uso")
    }
   return await licensePlateRepository.createLicensePlate(license)
}



async function updateLicensePlate(enable:enableBody) {
    return await licensePlateRepository.updateLicensePlate(enable)
}


const licensePlateService = {
    getAllLicensePlates,
    postLicensePlate,
    updateLicensePlate
}

export default licensePlateService