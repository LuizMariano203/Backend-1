import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response| null> {
    const {
      email,
      password,
    } = req.body;
    

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

     const {password: _, ...userWithoutPassword }= user
    return res.json({ userWithoutPassword, token });
  }
}
