import { inject, injectable } from 'tsyringe';

import { LikeRelation, Piu, Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IPiusRepository from '../repositories/IPiusRepository';
import ILikeRepository from '../repositories/ILikeRepository';

interface IRequest {
  id:string,
  userId: string
}

@injectable()
export default class LikePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,

    @inject('LikeRepository')
    private likeRepository :ILikeRepository
  ) { }

  public async execute(
    id: string,
    userId: string
  ): Promise<LikeRelation> {
    const piu = await this.piusRepository.findById(id);

    if (!piu) throw new AppError('Piu not found', 404);

  const piuliked = this.likeRepository.create(userId,id)

     
     return piuliked;
   
  }
}
