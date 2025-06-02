import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInsightDto {
  @ApiProperty({ description: "User ID", type: String })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: "Insight title", type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: "Insight context/content", type: String })
  @IsNotEmpty()
  @IsString()
  context: string;

  @ApiProperty({ description: "Insight status", type: String })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: "Number of views", type: Number })
  @IsNotEmpty()
  @IsNumber()
  views: number;
}
