import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    example: "user@example.com",
    description: "User email address",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "strongPassword123", description: "User password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
