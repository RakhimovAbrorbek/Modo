import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetTasksDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: "The ID of the user" })
  userId: string;

  @IsIn(["low", "medium", "high"])
  @ApiProperty({
    type: String,
    enum: ["low", "medium", "high"],
    description: "The priority level of the task",
  })
  level: string;
}
