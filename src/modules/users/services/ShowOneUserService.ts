import { inject, injectable } from 'tsyringe';
import { Users } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ShowOneUserService {
  constructor(
        @inject('UsersRepository')
            private usersRepository: IUsersRepository,

  ) {}

  public async execute(id : string): Promise<Omit<Users, 'password'>> {
    const user = await this.usersRepository.findOne(id);
    if (user === null) { throw new AppError('This user does not exist', 404); }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
