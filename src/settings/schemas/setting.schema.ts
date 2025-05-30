import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../../users/schemas/user.schema";

export type SettingDocument = HydratedDocument<Setting>
@Schema()
export class Setting {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  font_theme:string

  @Prop()
  timezone:string

  @Prop({default:true})
  shouldBeNotified:boolean

}
export const SettingSchema = SchemaFactory.createForClass(Setting)

