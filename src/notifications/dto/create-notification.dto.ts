import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  userId:string

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  message: string;

   @IsBoolean()
   @IsNotEmpty()
   isRead: boolean;
}
