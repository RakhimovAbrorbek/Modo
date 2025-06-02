import { IsBoolean, IsIn, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
  @ApiProperty({ description: "User ID to whom the notification belongs" })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: "Type of notification",
    enum: ["streak", "notification", "other"],
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(["streak", "notification", "other"])
  type: string;

  @ApiProperty({ description: "Notification message content" })
  @IsNotEmpty()
  @IsString()
  message: string;

}
