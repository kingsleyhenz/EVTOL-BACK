import { IDevice } from '../models/device.model.js';
import { CreateDeviceDto, UpdateDeviceDto } from '../dto/device.dto.js';
declare class DeviceService {
    createDevice(data: CreateDeviceDto): Promise<IDevice>;
    getAllDevices(): Promise<IDevice[]>;
    getDeviceById(id: string): Promise<IDevice | null>;
    updateDevice(id: string, data: UpdateDeviceDto): Promise<IDevice | null>;
    deleteDevice(id: string): Promise<IDevice | null>;
    findAvailableDevices(): Promise<IDevice[]>;
    checkBattery(id: string): Promise<number>;
}
declare const _default: DeviceService;
export default _default;
//# sourceMappingURL=device.service.d.ts.map