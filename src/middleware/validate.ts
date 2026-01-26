import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '../util/response.util.ts';

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObject);
    
    if (errors.length > 0) {
      const errorMessages = errors.map((error: any) => 
        Object.values(error.constraints || {}).join(', ')
      );
      return ResponseUtil.error(res, errorMessages.join('; '), 400);
    }
    
    req.body = dtoObject;
    next();
  };
};
