import { inject, injectable } from 'tsyringe';

import { Piu, Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IPiusRepository from '../repositories/IPiusRepository';

interface IRequest {
  id:string,
  text: string
}

@injectable()
export default class UpdatePiuService {
  constructor(
    @inject('PiusRepository')
    private piusRepository: IPiusRepository,


  ) { }

  public async execute({
    id,
    text
  }: IRequest): Promise<Piu> {
    const piu = await this.piusRepository.findById(id);

    if (!piu) throw new AppError('Piu not found', 404);

    const piuUpdated = this.piusRepository.update(
     id, text
    );
    return piuUpdated;
  }
}
