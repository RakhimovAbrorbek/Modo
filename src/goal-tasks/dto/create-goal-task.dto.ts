import { IsNotEmpty, IsString } from "class-validator"

export class CreateGoalTaskDto {
  @IsNotEmpty()
  @IsString()
  goalId: string
  @IsNotEmpty()
  @IsString()
  taskId: string
}
