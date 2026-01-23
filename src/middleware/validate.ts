import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Placeholder for actual Joi/Zod validation
    // For now it just passes through
    next();
  };
};
