import { Router } from 'express';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';

// Users

const routes = Router();

// Users
routes.use('/user', usersRoutes);

export default routes;
