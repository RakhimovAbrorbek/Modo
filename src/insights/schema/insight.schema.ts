import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";

export type InsightDocument = HydratedDocument<Insight>
@Schema()
export class Insight {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  title:string

  @Prop()
  context:string

  @Prop({enum:['draft','published']})
  status:string


  @Prop({default:0})
  views:number
}
export const InsightSchema = SchemaFactory.createForClass(Insight)