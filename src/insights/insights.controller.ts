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
import { InsightsService } from "./insights.service";
import { CreateInsightDto } from "./dto/create-insight.dto";
import { UpdateInsightDto } from "./dto/update-insight.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";

import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";

@ApiTags("insights")
@ApiBearerAuth()
@Controller("insights")
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user")
  @Post()
  @ApiOperation({ summary: "Create an insight" })
  @ApiResponse({ status: 201, description: "Insight created successfully." })
  create(@Body() createInsightDto: CreateInsightDto) {
    return this.insightsService.create(createInsightDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user")
  @Get()
  @ApiOperation({ summary: "Get all insights for user" })
  @ApiResponse({ status: 200, description: "Returns all insights." })
  findAll() {
    return this.insightsService.findAll();
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user")
  @Get(":id")
  @ApiOperation({ summary: "Get insight by ID" })
  @ApiResponse({ status: 200, description: "Returns the insight." })
  findOne(@Param("id") id: string) {
    return this.insightsService.findOne(id);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update insight (Admin only)" })
  update(@Param("id") id: string, @Body() updateInsightDto: UpdateInsightDto) {
    return this.insightsService.update(id, updateInsightDto);
  }



  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete insight (Admin only)" })
  remove(@Param("id") id: string) {
    return this.insightsService.remove(id);
  }
}
