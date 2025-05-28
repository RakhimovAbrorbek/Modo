import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  username: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;


  @IsNotEmpty()
  @IsString()
  password: string;


  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
