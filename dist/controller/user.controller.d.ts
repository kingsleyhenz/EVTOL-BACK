import { Request, Response } from 'express';
declare class UserController {
    register(req: Request, res: Response): Promise<Response>;
    login(req: Request, res: Response): Promise<Response>;
    getProfile(req: any, res: Response): Promise<Response>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=user.controller.d.ts.map