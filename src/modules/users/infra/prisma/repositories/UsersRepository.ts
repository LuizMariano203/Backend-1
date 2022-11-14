import prisma from '@shared/infra/prisma/client';
import { Prisma, Users } from '@prisma/client';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Prisma.UsersDelegate<Prisma.RejectOnNotFound | Prisma.RejectOnNotFound | undefined>

  constructor() {
    this.ormRepository = prisma.users;
  }

  public async update({ id, user }: IUpdateUserDTO): Promise<Users> {
    const userUpdated = await this.ormRepository.update({
      where: { id },
      data: { ...user, updated_at: new Date() },
    });
    return userUpdated;
  }

  public async findByEmailWithRelations(email: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { email },
    });

    return user;
  }

  public async findByEmailPhoneOrCpf(cpf: string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { cpf },
    });

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<Users> {
    const user = await this.ormRepository.create({ data });

    return user;
  }

  public async findAll():Promise<Users[]> {
    const users = await this.ormRepository.findMany();
    return users;
  }

  public async findOne(id:string): Promise<Users | null> {
    const user = await this.ormRepository.findFirst({
      where: { id },
    });
    return user;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.ormRepository.delete({
      where: { id },
    });
  }
}
