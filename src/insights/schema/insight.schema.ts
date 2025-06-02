import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";

export type InsightDocument = HydratedDocument<Insight>;

@Schema()
export class Insight {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @ApiProperty({
    type: String,
    description: "ID of the user associated with the insight",
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Title of the insight",
    required: true,
  })
  title: string;

  @Prop()
  @ApiProperty({
    type: String,
    description: "Context or content of the insight",
    required: true,
  })
  context: string;

  @Prop({ enum: ["draft", "published"] })
  @ApiProperty({
    type: String,
    enum: ["draft", "published"],
    description: "Status of the insight",
    required: true,
  })
  status: string;

  @Prop({ default: 0 })
  @ApiProperty({
    type: Number,
    description: "Number of views for the insight",
    default: 0,
  })
  views: number;
}

export const InsightSchema = SchemaFactory.createForClass(Insight);
