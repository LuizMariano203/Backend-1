import { LikeRelation } from "@prisma/client"
import { create } from "handlebars"

interface ILikeRepository{

    create(userId:string,piuId:string):Promise<LikeRelation>;
}

export default ILikeRepository