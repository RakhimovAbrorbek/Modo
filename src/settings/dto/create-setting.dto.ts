import { IsBoolean, IsIn, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

const VALID_TIMEZONES = Intl.supportedValuesOf("timeZone");

export class CreateSettingDto {
  @ApiProperty({ description: "User ID", example: "user123" })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: "Font theme name", example: "dark" })
  @IsNotEmpty()
  @IsString()
  font_theme: string;

  @ApiProperty({
    description: "Timezone",
    example: "Europe/London",
    enum: VALID_TIMEZONES,
  })
  @IsNotEmpty()
  @IsIn(VALID_TIMEZONES)
  timezone: string;

  @ApiProperty({ description: "Notification preference", example: true })
  @IsNotEmpty()
  @IsBoolean()
  shouldBeNotified: boolean;
}
