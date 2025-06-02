import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStatisticDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "The ID of the user",
    required: true,
  })
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: "Total number of tasks created by the user",
    required: true,
  })
  totalTasksCreated: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "Total number of tasks completed by the user",
    required: true,
  })
  totalTasksDone: number;
}
