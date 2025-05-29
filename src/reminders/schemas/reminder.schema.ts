import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Task } from "../../tasks/schemas/task.schema";

export type ReminderDocument = HydratedDocument<Reminder>
export class Reminder {


    @Prop({type:mongoose.Schema.Types.ObjectId,ref:Task.name})
    taskId:mongoose.Schema.Types.ObjectId

    @Prop({})
    remindAt:string

    @Prop({default:false})
    isActive:boolean

    @Prop({enum:['none','daily','weekly','monthly']})
    repeat:string


    @Prop()
    repeatDays:string
    
}
export const ReminderSchema = SchemaFactory.createForClass(Reminder)
