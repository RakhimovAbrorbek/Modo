import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @ApiProperty({
    type: String,
    description: "ID of the user associated with the notification",
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ enum: ["streak", "notification", "other"] })
  @ApiProperty({
    type: String,
    enum: ["streak", "notification", "other"],
    description: "Type of the notification",
    required: true,
  })
  type: string;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Message content of the notification",
    required: true,
  })
  message: string;

  @Prop()
  @ApiProperty({
    type: Boolean,
    description: "Read status of the notification",
    required: true,
  })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
