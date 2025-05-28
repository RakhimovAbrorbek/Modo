import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";

export type TaskDocument = HydratedDocument<Task>
@Schema({timestamps:true})
export class Task {


    @Prop({type:mongoose.Schema.Types.ObjectId,ref:User.name})
    userId:mongoose.Types.ObjectId


    @Prop()
    title:string


    @Prop()
    description:string


    @Prop()
    category:string

    @Prop()
    dueDate:Date

    @Prop({enum:['low','medium','high'],default:"low"})
    prority:string

    @Prop({default:false})
    is_completed:boolean

    
}
export const TaskSchema = SchemaFactory.createForClass(Task)
