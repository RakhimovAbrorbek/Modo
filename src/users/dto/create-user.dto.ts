import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "First name of the user",
    required: true,
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Last name of the user",
    required: true,
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Username of the user",
    required: true,
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "Email address of the user",
    required: true,
    format: "email",
  })
  email: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Date of birth of the user in ISO format",
    required: true,
  })
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Password for the user account",
    required: true,
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Confirmation of the password",
    required: true,
  })
  confirmPassword: string;
}
