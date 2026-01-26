import { IsString, IsNumber, IsNotEmpty, IsEnum, IsOptional, Max, Min } from 'class-validator';
import { DeviceState } from '../typings/enums.ts';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  serialNo!: string;

  @IsString()
  @IsNotEmpty()
  model!: string;

  @IsNumber()
  @Max(500)
  @Min(1)
  weight!: number;

  @IsNumber()
  @Max(100)
  @Min(0)
  battery!: number;

  @IsEnum(DeviceState)
  @IsOptional()
  state?: DeviceState;
}

export class UpdateDeviceDto {
  @IsString()
  @IsOptional()
  model?: string;

  @IsNumber()
  @IsOptional()
  @Max(500)
  weight?: number;

  @IsNumber()
  @IsOptional()
  @Max(100)
  battery?: number;

  @IsEnum(DeviceState)
  @IsOptional()
  state?: DeviceState;
}
