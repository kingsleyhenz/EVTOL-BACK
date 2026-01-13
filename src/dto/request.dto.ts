import { RequestStatus } from '../typings/enums';

export interface CreateRequestDto {
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  parcelCountry?: string;
  parcelState?: string;
  parcelCity?: string;
  parcelAddress?: string;
  parcelWidth?: number;
  parcelHeight?: number;
  parcelLength?: number;
  parcelWeight: number;
  recipientCountry?: string;
  recipientState?: string;
  recipientCity?: string;
  recipientaddress?: string;
  item: string;
  description: string;
  requestedDate?: Date;
}

export interface UpdateRequestStatusDto {
  status: RequestStatus;
}
