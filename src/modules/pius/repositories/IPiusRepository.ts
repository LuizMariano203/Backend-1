import ICreatePiuDTO from "../dtos/ICreatePiuDTO";
import {Piu} from '@prisma/client'


interface IPiusRepository{
    create(data:ICreatePiuDTO): Promise<Piu>;
    findById(id: string): Promise<Piu | null>;
    find():Promise<Piu[]>;
    deletePiu(id: string): Promise<void>;
    update(id:string, text:string):Promise<Piu>;   
    
}
export default IPiusRepository