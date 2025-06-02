import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @ApiProperty({
    type: String,
    description: "ID of the user associated with the task",
    required: true,
  })
  userId: mongoose.Types.ObjectId;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Title of the task",
    required: true,
  })
  title: string;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Description of the task",
    required: true,
  })
  description: string;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Category of the task",
    required: true,
  })
  category: string;

  @Prop()
  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Due date of the task in ISO format",
    required: true,
  })
  dueDate: Date;

  @Prop({ enum: ["low", "medium", "high"], default: "low" })
  @ApiProperty({
    type: String,
    enum: ["low", "medium", "high"],
    description: "Priority of the task",
    default: "low",
  })
  prority: string;

  @Prop({ default: false })
  @ApiProperty({
    type: Boolean,
    description: "Completion status of the task",
    default: false,
  })
  isCompleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
