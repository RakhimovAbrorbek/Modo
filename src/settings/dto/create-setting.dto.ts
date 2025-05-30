import { IsBoolean, IsIn, IsNotEmpty, IsString} from "class-validator";

const VALID_TIMEZONES = Intl.supportedValuesOf("timeZone"); 

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  @IsString()
  font_theme: string;

  @IsNotEmpty()
  @IsIn(VALID_TIMEZONES)
  timezone: string

  @IsNotEmpty()
  @IsBoolean()
  shouldBeNotified: boolean;
}
