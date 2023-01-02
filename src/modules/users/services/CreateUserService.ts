import { inject, injectable } from 'tsyringe';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import { Users } from '@prisma/client';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import { hash } from 'bcryptjs';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ) { }

  public async execute({
    name, birthday, cpf, email, phone, password,
  }: ICreateUserDTO): Promise<Users> {
    
    if (cpf === '') { throw new AppError('CPF area is empty'); }

    const userAlreadyExists = await this.usersRepository.findByCpf(cpf);

    if (userAlreadyExists ) throw new AppError('cpf already exists');

    if (name === '') { throw new AppError('Name area is empty'); }

    if (birthday === '') { throw new AppError('Birthday area is empty'); }

    if (phone === '') { throw new AppError('Number area is empty'); }

    if (email === '') { throw new AppError('Email area is empty'); }

    if (password === '') { throw new AppError('Password area is empty'); }
    

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
     
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
