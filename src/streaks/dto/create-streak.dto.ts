import { IsDateString, isDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStreakDto {
  @IsNotEmpty()
  @IsString()
  userId: string


  @IsNumber()
  @IsNotEmpty()
  currenStreak: number;

  @IsNotEmpty()
  @IsNumber()
  maxStreak: number;

  @IsDateString()
  @IsNotEmpty()
  lastStreakDate: Date;
}
