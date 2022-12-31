import { Router } from 'express';

import UsersController from '../controller/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/register', usersController.create);

usersRouter.get('/', usersController.showAll);

usersRouter.get('/:id', usersController.showOne);

usersRouter.delete('/:id', usersController.deleteUser);

usersRouter.put('/:id', usersController.update);

export default usersRouter;
