import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

import { SettingsService } from "./settings.service";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("settings")
@ApiBearerAuth()
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Create a new setting" })
  @ApiResponse({ status: 201, description: "Setting created successfully." })
  @ApiResponse({ status: 400, description: "Invalid input data." })
  @ApiBody({ type: CreateSettingDto })
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Get all settings" })
  @ApiResponse({ status: 200, description: "List of all settings." })
  findAll() {
    return this.settingsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get setting by ID" })
  @ApiResponse({ status: 200, description: "Setting details." })
  @ApiResponse({ status: 404, description: "Setting not found." })
  @ApiParam({ name: "id", description: "Setting ID" })
  findOne(@Param("id") id: string) {
    return this.settingsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update setting by ID" })
  @ApiResponse({ status: 200, description: "Setting updated successfully." })
  @ApiResponse({ status: 400, description: "Invalid update data." })
  @ApiResponse({ status: 404, description: "Setting not found." })
  @ApiParam({ name: "id", description: "Setting ID" })
  @ApiBody({ type: UpdateSettingDto })
  update(@Param("id") id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateSettingDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete setting by ID" })
  @ApiResponse({ status: 200, description: "Setting deleted successfully." })
  @ApiResponse({ status: 404, description: "Setting not found." })
  @ApiParam({ name: "id", description: "Setting ID" })
  remove(@Param("id") id: string) {
    return this.settingsService.remove(id);
  }
}
