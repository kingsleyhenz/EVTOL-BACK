import Devices from '../models/device.model.js';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto/device.dto';

class DeviceService {
  async createDevice(data: CreateDeviceDto) {
    return await Devices.create(data);
  }

  async getAllDevices() {
    return await Devices.find();
  }

  async getDeviceById(id: string) {
    return await Devices.findById(id);
  }

  async updateDevice(id: string, data: UpdateDeviceDto) {
    return await Devices.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteDevice(id: string) {
    return await Devices.findByIdAndDelete(id);
  }
}

export default new DeviceService();
