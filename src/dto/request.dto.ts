import { IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber, IsDate, IsEnum } from 'class-validator';
import { RequestStatus } from '../typings/enums.ts';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  recipientName!: string;

  @IsEmail()
  recipientEmail!: string;

  @IsString()
  @IsNotEmpty()
  recipientPhone!: string;

  @IsString()
  @IsOptional()
  parcelCountry?: string;

  @IsString()
  @IsOptional()
  parcelState?: string;

  @IsString()
  @IsOptional()
  parcelCity?: string;

  @IsString()
  @IsOptional()
  parcelAddress?: string;

  @IsNumber()
  @IsOptional()
  parcelWidth?: number;

  @IsNumber()
  @IsOptional()
  parcelHeight?: number;

  @IsNumber()
  @IsOptional()
  parcelLength?: number;

  @IsNumber()
  @IsNotEmpty()
  parcelWeight!: number;

  @IsString()
  @IsOptional()
  recipientCountry?: string;

  @IsString()
  @IsOptional()
  recipientState?: string;

  @IsString()
  @IsOptional()
  recipientCity?: string;

  @IsString()
  @IsOptional()
  recipientAddress?: string;

  @IsString()
  @IsNotEmpty()
  item!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDate()
  @IsOptional()
  requestedDate?: Date;
}

export class UpdateRequestStatusDto {
  @IsEnum(RequestStatus)
  status!: RequestStatus;
}
