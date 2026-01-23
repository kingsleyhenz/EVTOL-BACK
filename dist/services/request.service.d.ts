import { IRequest } from '../models/request.model.js';
import { CreateRequestDto } from '../dto/request.dto.js';
import { RequestStatus } from '../typings/enums.js';
declare class RequestService {
    createRequest(data: CreateRequestDto, userId: string): Promise<IRequest>;
    getAllRequests(): Promise<IRequest[]>;
    getRequestById(id: string): Promise<IRequest | null>;
    updateRequestStatus(id: string, status: RequestStatus): Promise<IRequest | null>;
    getUserRequests(userId: string): Promise<IRequest[]>;
    assignDevice(requestId: string, deviceId: string): Promise<IRequest | null>;
}
declare const _default: RequestService;
export default _default;
//# sourceMappingURL=request.service.d.ts.map