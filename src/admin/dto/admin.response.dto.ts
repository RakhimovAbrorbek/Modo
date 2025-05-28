import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AdminResponseDto {
  @Expose()
  readonly _id: string;

  @Expose()
  readonly username:string

  @Expose()
  readonly email: string;

  
  constructor(partial: Partial<AdminResponseDto>) {
    Object.assign(this, partial);
  }
}
