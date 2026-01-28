import { Response } from 'express';

export class ResponseUtil {
  public static success(res: Response, data: any, message: string = 'Success', statusCode: number = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  public static error(res: Response, message: string, statusCode: number = 500, errors: any = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  }

  public static created(res: Response, data: any, message: string = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }

  public static unauthorized(res: Response, message: string = 'Unauthorized access') {
    return this.error(res, message, 401);
  }

  public static forbidden(res: Response, message: string = 'Forbidden access') {
    return this.error(res, message, 403);
  }

  public static notFound(res: Response, message: string = 'Resource not found') {
    return this.error(res, message, 404);
  }
}
