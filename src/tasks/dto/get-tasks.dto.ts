import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetTasksDto {
  @IsIn(["low", "medium", "high"])
  @ApiProperty({
    type: String,
    enum: ["low", "medium", "high"],
    description: "The priority level of the task",
  })
  level: string;
}
