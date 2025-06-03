import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";
import { GetTasksDto } from "./dto/get-tasks.dto";

@ApiTags("tasks")
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get("top-user")
  @ApiOperation({ summary: "Get user with the most tasks" })
  @ApiResponse({
    status: 200,
    description: "User with the most tasks retrieved successfully",
  })
  async getUserWithMostTasks() {
    return this.tasksService.getUserWithMostTasks();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Selects tasks with priority" })
  @ApiQuery({ type: GetTasksDto })
  @ApiResponse({
    status: 200,
    description: "Tasks with specified priority retrieved successfully",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Get("priority")
  findWithPriority(@Query() getTasksDto: GetTasksDto) {
    return this.tasksService.getTasksWithPriority(getTasksDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get incomplete tasks for a user" })
  @ApiQuery({ name: "userId", type: String, description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "Incomplete tasks retrieved successfully",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Get("incomplete")
  async getNotCompletedTasks(@Query("userId") userId: string) {
    return this.tasksService.findNotCompleted(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get completed tasks for a user" })
  @ApiQuery({ name: "userId", type: String, description: "User ID" })
  @ApiResponse({
    status: 200,
    description: "Completed tasks retrieved successfully",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Get("complete")
  async getCompletedTasks(@Query("userId") userId: string) {
    return this.tasksService.findCompleted(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new task" })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: "Task created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all tasks" })
  @ApiResponse({ status: 200, description: "List of all tasks" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a task by ID" })
  @ApiParam({ name: "id", type: String, description: "Task ID" })
  @ApiResponse({ status: 200, description: "Task found" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a task by ID" })
  @ApiParam({ name: "id", type: String, description: "Task ID" })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: "Task updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a task by ID" })
  @ApiParam({ name: "id", type: String, description: "Task ID" })
  @ApiResponse({ status: 200, description: "Task deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("user", "admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Mark tasks as completed" })
  @ApiBody({
    schema: {
      type: "object",
      properties: { taskId: { type: "string", description: "Task ID" } },
      required: ["taskId"],
    },
  })
  @ApiResponse({
    status: 200,
    description: "Task marked as completed successfully",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Task not found" })
  @Post("done")
  doneTasks(@Body() body: { taskId: string }) {
    const { taskId } = body;
    return this.tasksService.completeTasks(taskId);
  }
}
