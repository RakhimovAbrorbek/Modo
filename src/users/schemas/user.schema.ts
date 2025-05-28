import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as uuidv4 } from "uuid";

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

  @Prop({default:()=>uuidv4()})
  activationLink:string
}
export const UserSchema = SchemaFactory.createForClass(User)

