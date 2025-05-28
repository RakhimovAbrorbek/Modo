import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserResponseDto {
  @Expose()
  readonly _id: string;

  @Expose()
  readonly firstName: string;

  @Expose()
  readonly lastName: string;

  @Expose()
  readonly username: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly karmaLevel: number;

  @Expose()
  dateOfBirth:Date

  @Expose()
  isVerified: boolean

  @Exclude()
  refreshToken: string;

  @Expose()
  avatar:string

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
