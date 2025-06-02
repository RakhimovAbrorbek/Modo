import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    example: "John",
    description: "User’s first name",
  })
  @Prop()
  firstName: string;

  @ApiProperty({
    example: "Doe",
    description: "User’s last name",
  })
  @Prop()
  lastName: string;

  @ApiProperty({
    example: "john_doe_97",
    description: "Unique username",
  })
  @Prop({ unique: true })
  username: string;

  @ApiProperty({
    example: "john@example.com",
    description: "Unique email address",
  })
  @Prop({ unique: true })
  email: string;

  @ApiProperty({
    example: "1997-04-10T00:00:00.000Z",
    description: "Date of birth",
    type: String,
    format: "date-time",
  })
  @Prop()
  dateOfBirth: Date;

  @ApiProperty({
    example: 1,
    description: "User’s karma level, default is 1",
    default: 1,
  })
  @Prop({ default: 1 })
  karmaLevel: number;

  @ApiProperty({
    example: false,
    description: "Verification status, default is false",
    default: false,
  })
  @Prop({ default: false })
  isVerified: boolean;

  @ApiProperty({
    example: "StrongPassword123!",
    description: "User password (should be hashed in DB)",
  })
  @Prop()
  password: string;

  @ApiProperty({
    example: "",
    description: "Refresh token (used for auth sessions)",
    default: "",
  })
  @Prop({ default: "" })
  refreshToken: string;

  @ApiProperty({
    example: "notAvailable",
    description: "Avatar image URL or status, default is 'notAvailable'",
    default: "notAvailable",
  })
  @Prop({ default: "notAvailable" })
  avatar: string;

  @ApiProperty({
    example: "5a8c74a0-9d9a-4a41-9f17-0a8c4862e0c2",
    description: "Activation link UUID",
  })
  @Prop({ default: () => uuidv4() })
  activationLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
