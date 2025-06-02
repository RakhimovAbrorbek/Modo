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
import { UpdatesService } from "./updates.service";
import { CreateUpdateDto } from "./dto/create-update.dto";
import { UpdateUpdateDto } from "./dto/update-update.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { SuperAdminGuard } from "../common/guards/superadmin.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { AdminGuard } from "../common/guards/admin.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("updates")
@Controller("updates")
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new update" })
  @ApiBody({ type: CreateUpdateDto })
  @ApiResponse({ status: 201, description: "Update created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Post()
  create(@Body() createUpdateDto: CreateUpdateDto) {
    return this.updatesService.create(createUpdateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all updates" })
  @ApiResponse({ status: 200, description: "List of all updates" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Get()
  findAll() {
    return this.updatesService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get an update by ID" })
  @ApiParam({ name: "id", type: String, description: "Update ID" })
  @ApiResponse({ status: 200, description: "Update found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Update not found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.updatesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update an update by ID" })
  @ApiParam({ name: "id", type: String, description: "Update ID" })
  @ApiBody({ type: UpdateUpdateDto })
  @ApiResponse({ status: 200, description: "Update updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Update not found" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUpdateDto: UpdateUpdateDto) {
    return this.updatesService.update(id, updateUpdateDto);
  }

  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete an update by ID" })
  @ApiParam({ name: "id", type: String, description: "Update ID" })
  @ApiResponse({ status: 200, description: "Update deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Update not found" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.updatesService.remove(id);
  }
}
