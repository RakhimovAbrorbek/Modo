import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type UpdateDocument = HydratedDocument<Update>
@Schema()
export class Update {
  @ApiProperty({
    example: "New version of our app just released stay tunned",
    description: "Title for Updates",
  })
  @Prop()
  title: string;

  @ApiProperty({
    example:
      "We have recently released our new version of our app with new features and we improved all fixing bugs! Enjoy!",
    description: "whole body for updates",
  })
  @Prop()
  body: string;

  @ApiProperty({
    example: "Abrorbek Rakhimov",
    description: "Who wrote the article about update",
  })
  @Prop()
  writtenBy: string;


  @ApiProperty({
    example: "2023-08-09",
    description: "when article or update is published",
  })
  @Prop()
  publishedAt: Date;
}
export const UpdateSchema = SchemaFactory.createForClass(Update)