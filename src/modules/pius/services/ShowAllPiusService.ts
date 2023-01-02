import { Piu } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import IPiusRepository from '../repositories/IPiusRepository';

@injectable()
export default class ShowAllPiusService {
  constructor(
        @inject('PiusRepository')
            private piusRepository: IPiusRepository,

  ) {}

  public async execute(): Promise<Piu[]> {
    const pius = await this.piusRepository.find()

    return pius;
  }
}
