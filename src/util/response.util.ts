import { Response } from 'express';

export class ResponseUtil {
  public static success(res: Response, data: any, statusCode: number = 200) {
    return res.status(statusCode).json({
      status: 'Success',
      data
    });
  }

  public static error(res: Response, message: string, statusCode: number = 500) {
    return res.status(statusCode).json({
      status: 'Error',
      message
    });
  }
}
