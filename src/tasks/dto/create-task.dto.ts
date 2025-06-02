import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "The ID of the user",
    required: true,
  })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Title of the task",
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Description of the task",
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Category of the task",
    required: true,
  })
  category: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Due date of the task in ISO format",
    required: true,
  })
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Priority of the task",
    required: true,
  })
  priority: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: "Completion status of the task",
    required: true,
  })
  isCompleted: boolean;
}
