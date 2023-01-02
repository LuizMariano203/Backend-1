import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class DeletePiuService {
  constructor(
        @inject('PiusRepository')
            private piusRepository: IPiusRepository,

  ) {}

  public async execute(id : string): Promise<void> {
    const piu = await this.piusRepository.findById(id);
    if (!piu) { throw new AppError('User not found', 404); }
    await this.piusRepository.deletePiu(id);
  }
}
