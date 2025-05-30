import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";

export type GoalDocument = HydratedDocument<Goal>
@Schema({timestamps:true})
export class Goal {

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:User.name})
    userId:mongoose.Schema.Types.ObjectId

    @Prop()
    title:string


    @Prop()
    description:string

    @Prop()
    progress:number

    @Prop()
    targetDate:Date
}
export const GoalSchema = SchemaFactory.createForClass(Goal)
