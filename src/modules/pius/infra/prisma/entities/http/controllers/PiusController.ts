import auth from '@config/auth';
import CreatePiuService from '@modules/pius/services/CreatePiusService';
import DeletePiuService from '@modules/pius/services/DeletePiuService';
import LikePiuService from '@modules/pius/services/LikePiuService';
import ShowAllPiusService from '@modules/pius/services/ShowAllPiusService';
import ShowOnePiuService from '@modules/pius/services/ShowOnePiuService';
import UpdatePiuService from '@modules/pius/services/UpdatePiuService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { JwtPayload, Secret, verify } from 'jsonwebtoken';
import { container } from 'tsyringe';

interface IRequest {
   provider_id:string,
   text:string,
   
}
export default class PiusController{
    public async create(req:Request, res:Response):Promise<Response>{
        const{ provider_id ,text} = req.body;

        const createPiuService = container.resolve(CreatePiuService);

        const piu = await createPiuService.execute({provider_id,text}) ;
        return res.json(piu);
    }

    public async show(req:Request, res:Response):Promise<Response>{
        const showAllPiusService = container.resolve(ShowAllPiusService);

        const pius = await showAllPiusService.execute();

        return res.json(pius);

    }

    public async showOne(req:Request, res:Response):Promise<Response>{
        const showOnePiuService = container.resolve(ShowOnePiuService);
        const { id } = req.params;
        const piu = await showOnePiuService.execute(id);

        return res.json(piu);

    }
    public async likePiu(req:Request, res:Response):Promise<Response>{
        const { id } = req.params;

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
            
        }   catch{
            throw new AppError('Invalid JWT token', 401)
        }


        const likePiuService = container.resolve(LikePiuService);
        const piu = await likePiuService.execute(id,req.user.id);

       

        return res.json(piu);

    }

    public async deletePiu(req: Request, res:Response):Promise<Response> {
        
        const {id} = req.params;

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
            
        }   catch{
            throw new AppError('Invalid JWT token', 401)
        }

        const showOnePiuService = container.resolve(ShowOnePiuService);
        
        const piu = await showOnePiuService.execute(id); 

        if(piu.provider_id !== req.user.id){throw new AppError('User has no authorization')}

        const deletePiu = container.resolve(DeletePiuService);

        await deletePiu.execute(id);
    
        return res.json();
      }

      public async update(req: Request, res:Response):Promise<Response> {
        const {
          text
        } = req.body;
        const { id } = req.params;
    


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
            
        }   catch{
            throw new AppError('Invalid JWT token', 401)
        }

        const showOnePiuService = container.resolve(ShowOnePiuService);
        
        const piu = await showOnePiuService.execute(id); 
       

        if(piu.provider_id !== req.user.id){throw new AppError('User has no authorization')}
        
        const updatePiu = container.resolve(UpdatePiuService);
    
        const piuUpdated = await updatePiu.execute({
          id,
          text
        });
    
        return res.status(201).json(piuUpdated);
      }
    }
