import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UpdateDocument = HydratedDocument<Update>
@Schema()
export class Update {
    @Prop()
    title:string

    @Prop()
    body:string
    
    @Prop()
    writtenBy:string

    @Prop()
    publishedAt:Date
}
export const UpdateSchema = SchemaFactory.createForClass(Update)