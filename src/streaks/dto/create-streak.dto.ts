import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStreakDto {
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
    description: "Current streak count",
    required: true,
  })
  currentStreak: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: "Maximum streak count",
    required: true,
  })
  maxStreak: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Last streak date in ISO format",
    required: true,
  })
  lastStreakDate: Date;
}
