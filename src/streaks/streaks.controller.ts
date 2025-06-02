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
import { StreaksService } from "./streaks.service";
import { CreateStreakDto } from "./dto/create-streak.dto";
import { UpdateStreakDto } from "./dto/update-streak.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { AdminGuard } from "../common/guards/admin.guard";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("streaks")
@Controller("streaks")
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new streak" })
  @ApiBody({ type: CreateStreakDto })
  @ApiResponse({ status: 201, description: "Streak created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Post()
  create(@Body() createStreakDto: CreateStreakDto) {
    return this.streaksService.create(createStreakDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all streaks" })
  @ApiResponse({ status: 200, description: "List of all streaks" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Get()
  findAll() {
    return this.streaksService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a streak by ID" })
  @ApiParam({ name: "id", type: String, description: "Streak ID" })
  @ApiResponse({ status: 200, description: "Streak found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Streak not found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.streaksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a streak by ID" })
  @ApiParam({ name: "id", type: String, description: "Streak ID" })
  @ApiBody({ type: UpdateStreakDto })
  @ApiResponse({ status: 200, description: "Streak updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Streak not found" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStreakDto: UpdateStreakDto) {
    return this.streaksService.update(id, updateStreakDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a streak by ID" })
  @ApiParam({ name: "id", type: String, description: "Streak ID" })
  @ApiResponse({ status: 200, description: "Streak deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Streak not found" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.streaksService.remove(id);
  }
}
