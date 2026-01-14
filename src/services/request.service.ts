import Request from '../models/request.model.js';
import { CreateRequestDto } from '../dto/request.dto';

class RequestService {
  async createRequest(data: CreateRequestDto, userId: string) {
    return await Request.create({ ...data, user: userId });
  }

  async getAllRequests() {
    return await Request.find().populate('user deliveryDevice');
  }

  async getRequestById(id: string) {
    return await Request.findById(id).populate('user deliveryDevice');
  }

  async updateRequestStatus(id: string, status: string) {
    return await Request.findByIdAndUpdate(id, { requestStatus: status }, { new: true });
  }

  async getUserRequests(userId: string) {
    return await Request.find({ user: userId });
  }
}

export default new RequestService();
