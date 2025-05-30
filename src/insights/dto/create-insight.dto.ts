import { IsNotEmpty, IsNumber, isNumber, IsString } from "class-validator";

export class CreateInsightDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  context: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNumber()
  @IsNotEmpty()
  views: number;
}
