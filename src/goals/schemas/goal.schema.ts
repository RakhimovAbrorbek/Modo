import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";

export type GoalDocument = HydratedDocument<Goal>;

@Schema({ timestamps: true })
export class Goal {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @ApiProperty({
    type: String,
    description: "ID of the user associated with the goal",
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Title of the goal",
    required: true,
  })
  title: string;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Description of the goal",
    required: true,
  })
  description: string;

  @Prop()
  @ApiProperty({
    type: Number,
    description: "Progress of the goal (e.g., percentage)",
    required: true,
  })
  progress: number;

  @Prop()
  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Target date for the goal in ISO format",
    required: true,
  })
  targetDate: Date;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
