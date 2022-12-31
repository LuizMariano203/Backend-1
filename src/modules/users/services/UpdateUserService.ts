import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

type IRequest = IUpdateUserDTO

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) { }

  public async execute({
    id,
    user: {
      name, cpf, birthday, email, phone, password,
    },
  }: IRequest): Promise<Omit<Users, 'password'>> {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new AppError('User not found', 404);

    const userAlreadyExists = await this.usersRepository.findByCpf(cpf);

    if (userAlreadyExists && userAlreadyExists.id !== id) throw new AppError('cpf already exists');

    if (name === '') { throw new AppError('Name area is empty'); }

    if (birthday === '') { throw new AppError('Birthday area is empty'); }

    if (cpf === '') { throw new AppError('CPF area is empty'); }

    if (phone === '') { throw new AppError('Number area is empty'); }

    if (email === '') { throw new AppError('Email area is empty'); }

    if (password === '') { throw new AppError('Password area is empty'); }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const userUpdated = this.usersRepository.update({
      id,
      user: {
        name,
        birthday,
        email,
        cpf,
        password: hashedPassword,
        phone,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
