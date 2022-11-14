import { inject, injectable } from 'tsyringe';
import { Users } from '@prisma/client';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class ShowAllUserService {
  constructor(
        @inject('UsersRepository')
            private usersRepository: IUsersRepository,

  ) {}

  public async execute(): Promise<Omit<Users,"password">[]> {
    const usersWithoutPassword = (await this.usersRepository.findAll()).map(({password: _,...userWithoutPassword})=>userWithoutPassword);

    return usersWithoutPassword;
  }
}
