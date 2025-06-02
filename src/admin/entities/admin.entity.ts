import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
  @ApiProperty({
    example: "admin123",
    description: "Unique username of the admin",
  })
  @Prop({ unique: true })
  username: string;

  @ApiProperty({
    example: "admin@example.com",
    description: "Admin's email address",
  })
  @Prop()
  email: string;

  @ApiProperty({
    example: "strongpassword",
    description: "Hashed password of the admin",
  })
  @Prop()
  password: string;

  @ApiProperty({ example: false, description: "Is this admin the creator?" })
  @Prop({ default: false })
  isCreator: boolean;

  @ApiProperty({ example: "", description: "Refresh token for the admin" })
  @Prop({ default: "" })
  refreshToken: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
