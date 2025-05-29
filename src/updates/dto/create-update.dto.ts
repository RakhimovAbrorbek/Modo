import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateUpdateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  writtenBy: string;

  @IsNotEmpty()
  @IsDateString()
  publishedAt: Date;
}
