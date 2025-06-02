import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";

export type StatisticDocument = HydratedDocument<Statistic>;

@Schema({ timestamps: true })
export class Statistic {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @ApiProperty({
    type: String,
    description: "ID of the user associated with the statistic",
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  @ApiProperty({
    type: Number,
    description: "Total number of tasks created by the user",
    required: true,
  })
  totalTasksCreated: number;

  @Prop()
  @ApiProperty({
    type: Number,
    description: "Total number of tasks completed by the user",
    required: true,
  })
  totalTasksDone: number;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
