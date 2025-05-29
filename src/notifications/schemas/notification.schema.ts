import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";

export type NotificationDocument = HydratedDocument<Notification>
@Schema({timestamps:true})
export class Notification {
    

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:User.name})
    userId:mongoose.Schema.Types.ObjectId

    @Prop({enum:['friendrequest','friendreject','streak','notification','other']})
    type: string


    @Prop()
    message:string

    @Prop()
    isRead:boolean

}
export const NotificationSchema = SchemaFactory.createForClass(Notification)
