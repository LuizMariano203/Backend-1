import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';
import { Piu } from '@prisma/client';

@injectable()
export default class ShowOnePiuService {
  constructor(
        @inject('PiusRepository')
            private piusRepository: IPiusRepository,

  ) {}

  public async execute(id : string): Promise<Piu> {
    const piu = await this.piusRepository.findById(id);
    if (piu === null) { throw new AppError('This piu does not exist', 404); }
    
    return piu
  }
}
