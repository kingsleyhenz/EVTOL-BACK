import { DeviceState } from '../typings/enums.ts';

export interface CreateDeviceDto {
  serialNo: string;
  model: string;
  weight: number;
  battery: number;
  state?: DeviceState;
}

export interface UpdateDeviceDto {
  model?: string;
  weight?: number;
  battery?: number;
  state?: DeviceState;
}
