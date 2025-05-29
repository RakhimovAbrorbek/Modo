import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateReminderDto {
  @IsNotEmpty()
  @IsString()
  taskId: string

  @IsDateString()
  @IsNotEmpty()
  remindAt: string;

  @IsNotEmpty()
  @IsString()
  isActive: boolean;


  @IsNotEmpty()
  @IsString()
  repeat: string;

  @IsNotEmpty()
  @IsString()
  repeatDays: string;
}
