import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";

export type StreakDocument = HydratedDocument<Streak>;

@Schema()
export class Streak {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @ApiProperty({
    type: String,
    description: "ID of the user associated with the streak",
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  @ApiProperty({
    type: Number,
    description: "Current streak count",
    required: true,
  })
  currentStreak: number;

  @Prop()
  @ApiProperty({
    type: Number,
    description: "Maximum streak count",
    required: true,
  })
  maxStreak: number;

  @Prop()
  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Last streak date in ISO format",
    required: true,
  })
  lastStreakDate: Date;
}

export const StreakSchema = SchemaFactory.createForClass(Streak);
