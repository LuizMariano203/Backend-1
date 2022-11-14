import { inject, injectable } from 'tsyringe';

import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  birthday: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) { }

  public async execute({
    name, cpf, birthday, email, phone, password,
  }: IRequest): Promise<Users> {
    const userAlreadyExists = await this.usersRepository.findByEmailPhoneOrCpf(cpf);

    if (userAlreadyExists) throw new AppError('cpf already exists');

    if (name === '') { throw new AppError('Name area is empty'); }

    if (birthday === '') { throw new AppError('Birthday area is empty'); }

    if (cpf === '') { throw new AppError('CPF area is empty'); }

    if (phone === '') { throw new AppError('Number area is empty'); }

    if (email === '') { throw new AppError('Email area is empty'); }

    if (password === '') { throw new AppError('Password area is empty'); }
    

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
     
        name,
      birthday,
      email,
      cpf,
      password: hashedPassword,
      phone,

    });

    

    return user;
  }
}
