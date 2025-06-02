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
import { GoalsService } from "./goals.service";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("Goals")
@ApiBearerAuth()
@Controller("goals")
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user")
  @Post()
  @ApiOperation({ summary: "Create a new goal (User access)" })
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Get all goals (Admin access)" })
  findAll() {
    return this.goalsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get a goal by ID (Admin access)" })
  findOne(@Param("id") id: string) {
    return this.goalsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update a goal by ID (Admin access)" })
  update(@Param("id") id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(id, updateGoalDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete a goal by ID (Admin access)" })
  remove(@Param("id") id: string) {
    return this.goalsService.remove(id);
  }
}
