import { Request, Response } from 'express';
declare class DeviceController {
    registerDevice(req: Request, res: Response): Promise<Response>;
    getAllDevices(req: Request, res: Response): Promise<Response>;
    getAvailableDevices(req: Request, res: Response): Promise<Response>;
    sendConfirmationEmail(name: string, email: string): Promise<void>;
}
declare const _default: DeviceController;
export default _default;
//# sourceMappingURL=device.controller.d.ts.map