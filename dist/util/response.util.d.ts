import { Response } from 'express';
export declare class ResponseUtil {
    static success(res: Response, data: any, statusCode?: number): Response<any, Record<string, any>>;
    static error(res: Response, message: string, statusCode?: number): Response<any, Record<string, any>>;
}
//# sourceMappingURL=response.util.d.ts.map