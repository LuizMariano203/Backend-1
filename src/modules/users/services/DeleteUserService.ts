import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class DeleteUserService {
  constructor(
        @inject('UsersRepository')
            private usersRepository: IUsersRepository,

  ) {}

  public async execute(id : string): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if (!user) { throw new AppError('User not found', 404); }
    await this.usersRepository.deleteUser(id);
  }
}
