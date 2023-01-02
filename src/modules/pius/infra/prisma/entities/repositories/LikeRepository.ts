import ILikeRepository from "@modules/pius/repositories/ILikeRepository";
import { LikeRelation } from "@prisma/client";
import client from "@shared/infra/prisma/client";

export default class LikeRepository implements ILikeRepository{

    private ormRepository;

    constructor(){
        this.ormRepository = client.likeRelation;
    }
    public async create(userId:string,piuId:string):Promise<LikeRelation>{
    const createdLike = this.ormRepository.create({
            data:{piuId,usersId:userId}
        });

        return createdLike;

    }
}