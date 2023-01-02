import UsersRepository from "@modules/users/infra/prisma/repositories/UsersRepository";
import { Piu } from "@prisma/client";
import AppError from "@shared/errors/AppError";
import { isThisSecond, startOfHour } from "date-fns";
import { inject, injectable } from "tsyringe";
import IPiusRepository from "../repositories/IPiusRepository";

interface IRequest {
    provider_id: string;
    text: string;
   
}

@injectable()
export default class CreatePiuService {
    constructor(
        @inject('PiusRepository')
        private piusRepository: IPiusRepository,

        @inject('UsersRepository')
        private usersRepository: UsersRepository
        ){}
        public async execute({ provider_id,text}:IRequest): Promise <Piu> {
            

            const provider = await this.usersRepository.findById(provider_id);
            if(!provider){
                throw new AppError('Provider not found', 404)
            }

            const piu = await this.piusRepository.create({
                provider_id,
                text,
            });

            return piu;
        }
    
}