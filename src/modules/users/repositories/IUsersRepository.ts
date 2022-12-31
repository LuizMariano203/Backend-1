import { Users} from '@prisma/client';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
  findByEmailWithRelations(email: string): Promise<Users | null>;
  findByCpf(cpf: string): Promise< Users | null>;
  create(data: ICreateUserDTO): Promise<Users>;
  findAll():Promise<Users[]>;
  findOne(id:string):Promise<Users | null>;
  deleteUser(id:string):Promise<void>;
  update(data:IUpdateUserDTO):Promise<Users>
}

export default IUsersRepository;
