import { NextFunction, Request,Response } from "express";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import AppError from '@shared/errors/AppError';
import auth from '@config/auth';
import { id } from "date-fns/locale";


export default function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
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
        
        return next();
        
    }   catch{
        throw new AppError('Invalid JWT token', 401)
    }
}

