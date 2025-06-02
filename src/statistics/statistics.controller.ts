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
import { StatisticsService } from "./statistics.service";
import { CreateStatisticDto } from "./dto/create-statistic.dto";
import { UpdateStatisticDto } from "./dto/update-statistic.dto";
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

@ApiTags("statistics")
@Controller("statistics")
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new statistic" })
  @ApiBody({ type: CreateStatisticDto })
  @ApiResponse({ status: 201, description: "Statistic created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Post()
  create(@Body() createStatisticDto: CreateStatisticDto) {
    return this.statisticsService.create(createStatisticDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all statistics" })
  @ApiResponse({ status: 200, description: "List of all statistics" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Get()
  findAll() {
    return this.statisticsService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a statistic by ID" })
  @ApiParam({ name: "id", type: String, description: "Statistic ID" })
  @ApiResponse({ status: 200, description: "Statistic found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Statistic not found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.statisticsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a statistic by ID" })
  @ApiParam({ name: "id", type: String, description: "Statistic ID" })
  @ApiBody({ type: UpdateStatisticDto })
  @ApiResponse({ status: 200, description: "Statistic updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Statistic not found" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateStatisticDto: UpdateStatisticDto
  ) {
    return this.statisticsService.update(id, updateStatisticDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a statistic by ID" })
  @ApiParam({ name: "id", type: String, description: "Statistic ID" })
  @ApiResponse({ status: 200, description: "Statistic deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Statistic not found" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.statisticsService.remove(id);
  }
}
