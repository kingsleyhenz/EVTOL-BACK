import Device, { IDevice } from '../models/device.model.ts';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto/device.dto.ts';
import { DeviceState } from '../typings/enums.ts';

export class DeviceService {
  async createDevice(data: CreateDeviceDto): Promise<IDevice> {
    const device = new Device(data);
    return await device.save();
  }

  async getAllDevices(): Promise<IDevice[]> {
    return await Device.find().exec();
  }

  async getDeviceById(id: string): Promise<IDevice | null> {
    return await Device.findById(id).exec();
  }

  async updateDevice(id: string, data: UpdateDeviceDto): Promise<IDevice | null> {
    return await Device.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteDevice(id: string): Promise<IDevice | null> {
    return await Device.findByIdAndDelete(id).exec();
  }

  async findAvailableDevices(): Promise<IDevice[]> {
    return await Device.find({ state: DeviceState.IDLE, battery: { $gt: 25 } }).exec();
  }

  async checkBattery(id: string): Promise<number> {
    const device = await Device.findById(id).exec();
    return device ? device.battery : 0;
  }
}


