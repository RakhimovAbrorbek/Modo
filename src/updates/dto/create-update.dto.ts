import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUpdateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Title of the update",
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Body content of the update",
    required: true,
  })
  body: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Author of the update",
    required: true,
  })
  writtenBy: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Publication date of the update in ISO format",
    required: true,
  })
  publishedAt: Date;
}
