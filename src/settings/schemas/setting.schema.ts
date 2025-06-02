import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";

export type SettingDocument = HydratedDocument<Setting>;

@Schema()
export class Setting {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @ApiProperty({
    type: String,
    description: "ID of the user associated with the setting",
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Font theme preference for the user",
    required: true,
  })
  font_theme: string;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Timezone preference for the user",
    required: true,
  })
  timezone: string;

  @Prop({ default: true })
  @ApiProperty({
    type: Boolean,
    description: "Whether the user should receive notifications",
    default: true,
  })
  shouldBeNotified: boolean;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
