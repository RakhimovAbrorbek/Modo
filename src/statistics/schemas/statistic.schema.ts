import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";

export type StatisticDocument = HydratedDocument<Statistic>
@Schema({timestamps:true})
export class Statistic {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  totalTasksCreated:number


  @Prop()
  totalTasksDone:number

  @Prop()
  completionRate:number

  @Prop()
  missedTasks:number

  
}
export const StatisticSchema = SchemaFactory.createForClass(Statistic)
