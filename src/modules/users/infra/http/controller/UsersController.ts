import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import ShowAllUserService from '@modules/users/services/ShowAllUsersService';
import ShowOneUserService from '@modules/users/services/ShowOneUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import AppError from '@shared/errors/AppError';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
import auth from '@config/auth';

export default class UserController {
  
  public async create(req:Request, res:Response): Promise<Response> {
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

    const { password: _, ...userWithoutPassword} = user;
    return res.status(201).json(userWithoutPassword);
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
  
    const authHeader = req.headers.authorization;

    if (!authHeader){
        throw new AppError('JWT token is missing', 401);
    }

    const [, token]= authHeader.split(' ');

    try{ 
        const decoded = verify(token, auth.jwt.secret as Secret);

        const {sub} = decoded as JwtPayload;

        req.user = {
            id: sub as string ,
        }
        
       console.log(req.user.id);
        
    }   catch{
        throw new AppError('Invalid JWT token', 401)
    }


    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute(req.user.id);

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
