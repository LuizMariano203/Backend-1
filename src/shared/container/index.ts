import { container } from 'tsyringe';

import './providers';

// Users
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/prisma/repositories/UsersRepository';
import PiusRepository from '@modules/pius/infra/prisma/entities/repositories/PiusRepository';
import IPiusRepository from '@modules/pius/repositories/IPiusRepository';
import ILikeRepository from '@modules/pius/repositories/ILikeRepository';
import LikeRepository from '@modules/pius/infra/prisma/entities/repositories/LikeRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IPiusRepository>('PiusRepository', PiusRepository);

container.registerSingleton<ILikeRepository>('LikeRepository', LikeRepository);
