import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStatisticDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNumber()
  @IsNotEmpty()
  totalTasksCreated: number;

  @IsNotEmpty()
  @IsNumber()
  totalTasksDone: number;
}
