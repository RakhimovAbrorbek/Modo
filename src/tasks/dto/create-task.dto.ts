import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  prority: string;

  @IsNotEmpty()
  @IsBoolean()
  is_completed: boolean;
}
