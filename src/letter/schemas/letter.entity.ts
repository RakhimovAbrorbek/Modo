import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Goal } from "../../goals/schemas/goal.schema";

export type LetterDocument = HydratedDocument<Letter>
@Schema()
export class Letter {

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:Goal.name})
    goalId:mongoose.Schema.Types.ObjectId

    @Prop()
    title:string

    @Prop()
    body:string


    @Prop()
    remindAt:Date
    
}
export const LetterSchema = SchemaFactory.createForClass(Letter)

