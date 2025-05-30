import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";

export type StreakDocument = HydratedDocument<Streak>
@Schema()
export class Streak {
    
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:User.name})
    userId:mongoose.Schema.Types.ObjectId

    @Prop()
    currenStreak:number

    @Prop()
    maxStreak:number

    @Prop()
    lastStreakDate:Date
}

export const StreakSchema = SchemaFactory.createForClass(Streak)
