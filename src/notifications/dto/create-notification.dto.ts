import { IsBoolean, IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(["streak", "notification", "other"])
  type: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsBoolean()
  @IsNotEmpty()
  isRead: boolean;
}
