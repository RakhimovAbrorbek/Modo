import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateLetterDto {
  @IsNotEmpty()
  @IsString()
  goalId: string

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  @IsDateString()
  remindAt: Date;
}
