import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Task } from "../../tasks/schemas/task.schema";

export type GoalTaskDocument = HydratedDocument<GoalTask>
@Schema()
export class GoalTask { 

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:GoalTask.name})
    goalId:mongoose.Schema.Types.ObjectId

    
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:Task.name})
    taskId:mongoose.Schema.Types.ObjectId
}
export const GoalTaskSchema = SchemaFactory.createForClass(GoalTask)

