import { itensBody } from '@/schemas/item/itensSCHEMA';
import { conflictError } from "@/errors/conflict-error";
import itemRepository from "@/repositories/item-repository";
import { enableBody } from '@/schemas/item/enableItemSCHEMA';
import licensePlateRepository from '@/repositories/licensePlate-repository';

async function getAllLicensePlates(){
    const allLicenses = await licensePlateRepository.findAllLicensePlates()
    return allLicenses
}

async function postLicensePlate(licenseName:string) {
    const hasLicense = await licensePlateRepository.findByLicense(licenseName)
    if(hasLicense){
        throw conflictError("O nome ja está em uso")
    }
   return await licensePlateRepository.createLicensePlate(licenseName)
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