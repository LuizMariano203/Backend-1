import { Router } from 'express';

import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', usersController.create);

usersRoutes.get('/', usersController.showAll);

usersRoutes.get('/:id', usersController.showOne);

usersRoutes.delete('/:id', usersController.deleteUser);

usersRoutes.put('/:id', usersController.update);

export default usersRoutes;
