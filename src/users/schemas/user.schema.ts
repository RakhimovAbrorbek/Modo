import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>
@Schema({timestamps:true})
export class User {
  @Prop()
  firstName:string

  @Prop()
  lastName:string

  @Prop({unique:true})
  username:string

  @Prop({unique:true})
  email:string

  @Prop()
  dateOfBirth:Date
  
  @Prop({default:1})
  karmaLevel:number

  @Prop({default:false})
  isVerified:boolean

  @Prop()
  password:string

  @Prop({default:""})
  refreshToken:string

  @Prop({default:"notAvailable"})
  avatar:string
}
export const UserSchema = SchemaFactory.createForClass(User)

