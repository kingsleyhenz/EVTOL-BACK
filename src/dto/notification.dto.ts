import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsEnum(['Read', 'Unread'])
  @IsOptional()
  status?: "Read" | "Unread";
}

export class NotificationResponseDto {
  id!: string;
  title!: string;
  body!: string;
  status!: string;
  createdAt?: string;
}
