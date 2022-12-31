import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

// Users

const routes = Router();

// Users
routes.use('/user', usersRouter);
routes.use('/sessions',sessionsRouter)

export default routes;
