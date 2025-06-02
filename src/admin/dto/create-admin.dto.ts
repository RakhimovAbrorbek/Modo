import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({
    example: "admin_kotta",
    description: "Admin username",
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: "admin@example.com",
    description: "Valid email address of the admin",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "StrongPassword123!",
    description: "Password of the admin",
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: "StrongPassword123!",
    description: "Confirm password (must match the password)",
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
