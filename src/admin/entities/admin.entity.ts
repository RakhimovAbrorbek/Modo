import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type  AdminDocument  = HydratedDocument<Admin>
@Schema({timestamps:true})
export class Admin {

    @Prop({unique:true})
    username:string

    @Prop()
    email:string


    @Prop()
    password:string

    @Prop({default:false})
    isCreator:boolean

    @Prop({default:""})
    refreshToken:string
}
export const AdminSchema = SchemaFactory.createForClass(Admin)

