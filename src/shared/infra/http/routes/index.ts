import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import piusRouter from '@modules/pius/infra/prisma/entities/http/routes/pius.routes';

// Users

const routes = Router();

// Users
routes.use('/user', usersRouter);
routes.use('/sessions',sessionsRouter)
routes.use('/pius',piusRouter)

export default routes;
