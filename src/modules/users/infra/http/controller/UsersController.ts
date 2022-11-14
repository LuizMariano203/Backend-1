import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowAllUserService from '@modules/users/services/ShowAllUsersService';
import ShowOneUserService from '@modules/users/services/ShowOneUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      birthday,
      email,
      cpf,
      phone,
      password,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      birthday,
      email,
      cpf,
      phone,
      password,
    });

    return res.status(201).json(user);
  }

  public async showAll(req: Request, res:Response):Promise<Response> {
    const showAllUserService = container.resolve(ShowAllUserService);
    const users = await showAllUserService.execute();

    return res.json(users);
  }

  public async showOne(req: Request, res:Response):Promise<Response> {
    const showOneUserService = container.resolve(ShowOneUserService);
    const { id } = req.params;
    const user = await showOneUserService.execute(id);

    return res.json(user);
  }

  public async deleteUser(req: Request, res:Response):Promise<Response> {
    const { id } = req.params;
    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute(id);

    return res.json();
  }

  public async update(req: Request, res:Response):Promise<Response> {
    const {
      name,
      birthday,
      email,
      cpf,
      phone,
      password,
    } = req.body;
    const { id } = req.params;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      user: {
        name,
        birthday,
        email,
        cpf,
        phone,
        password,
      },
    });

    return res.status(201).json(user);
  }
}
