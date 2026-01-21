import Request, { IRequest } from '../models/request.model.js';
import { CreateRequestDto } from '../dto/request.dto.js';
import { RequestStatus } from '../typings/enums.js';

class RequestService {
  async createRequest(data: CreateRequestDto, userId: string): Promise<IRequest> {
    const request = new Request({ ...data, user: userId });
    return await request.save();
  }

  async getAllRequests(): Promise<IRequest[]> {
    return await Request.find().populate('user deliveryDevice').exec();
  }

  async getRequestById(id: string): Promise<IRequest | null> {
    return await Request.findById(id).populate('user deliveryDevice').exec();
  }

  async updateRequestStatus(id: string, status: RequestStatus): Promise<IRequest | null> {
    return await Request.findByIdAndUpdate(id, { requestStatus: status }, { new: true }).exec();
  }

  async getUserRequests(userId: string): Promise<IRequest[]> {
    return await Request.find({ user: userId }).exec();
  }

  async assignDevice(requestId: string, deviceId: string): Promise<IRequest | null> {
    return await Request.findByIdAndUpdate(requestId, { 
      deliveryDevice: deviceId, 
      requestStatus: RequestStatus.ACCEPTED 
    }, { new: true }).exec();
  }
}

export default new RequestService();
