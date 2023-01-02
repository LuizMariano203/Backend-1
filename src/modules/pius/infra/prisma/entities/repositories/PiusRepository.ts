import IPiusRepository from "@modules/pius/repositories/IPiusRepository";
import ICreatePiuDTO from "@modules/pius/dtos/ICreatePiuDTO";
import prisma from "@shared/infra/prisma/client";
import { Piu } from "@prisma/client";
import  client from '@shared/infra/prisma/client';
import { nextDay } from "date-fns";


export default class PiusRepository implements IPiusRepository{

    private ormRepository;

    constructor(){
        this.ormRepository = client.piu;
    }
    public async create({provider_id,text}:ICreatePiuDTO):Promise<Piu> {
        const piu = await this.ormRepository.create({
            data: {
                provider_id,
                text
            },
        });

        return piu
    }
    

    public async find(): Promise<Piu[]> {
        const pius = await this.ormRepository.findMany();

        return pius;
        
    }

    public async findById(id: string): Promise<Piu | null> {
        const piu = await this.ormRepository.findFirst({
            where:{ id}
        })
        return piu;
    }

    public async deletePiu(id: string): Promise<void> {
        await this.ormRepository.delete({
          where: { id },
        });
      }

      public async update(id:string,text: string): Promise<Piu> {
        const piuUpdated = await this.ormRepository.update({
          where: { id },
          data: { text, updated_at: new Date() },
        });
        return piuUpdated;
      }

  
      
      
}
