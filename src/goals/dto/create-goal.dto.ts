import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGoalDto {
  @IsNotEmpty()
  @IsString()
 userId: string

 @IsNotEmpty()
 @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  progress: number;

  @IsDateString()
  @IsNotEmpty()
  targetDate: Date;
}
