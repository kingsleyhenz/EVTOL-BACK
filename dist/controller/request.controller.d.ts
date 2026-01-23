import { Request, Response } from 'express';
declare class RequestController {
    makeRequest(req: any, res: Response): Promise<Response>;
    getAllRequests(req: Request, res: Response): Promise<Response>;
    getMyRequests(req: any, res: Response): Promise<Response>;
    getRequestById(req: Request, res: Response): Promise<Response>;
    acceptRequest(req: any, res: Response): Promise<Response>;
}
declare const _default: RequestController;
export default _default;
//# sourceMappingURL=request.controller.d.ts.map