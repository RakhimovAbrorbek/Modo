import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGoalDto {
  @ApiProperty({
    description: "User ID who owns the goal",
    example: "643d9a12f7b9c00123abcd45",
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: "Goal title", example: "Learn NestJS" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: "Detailed description of the goal",
    example: "Master NestJS in 3 months",
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: "Progress percentage (0-100)", example: 25 })
  @IsNotEmpty()
  @IsNumber()
  progress: number;

  @ApiProperty({
    description: "Target date for goal completion (ISO string)",
    example: "2025-12-31T23:59:59Z",
  })
  @IsNotEmpty()
  @IsDateString()
  targetDate: string;
}
