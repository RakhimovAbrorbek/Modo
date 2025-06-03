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
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("notifications")
@ApiBearerAuth() 
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Create a new notification (Admin only)" })
  @ApiResponse({
    status: 201,
    description: "Notification created successfully.",
  })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  @ApiBody({ type: CreateNotificationDto })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Get all notifications (Admin only)" })
  @ApiResponse({ status: 200, description: "List of notifications returned." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  findAll() {
    return this.notificationsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get a notification by ID (Admin only)" })
  @ApiParam({ name: "id", description: "Notification ID" })
  @ApiResponse({ status: 200, description: "Notification returned." })
  @ApiResponse({ status: 404, description: "Notification not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  findOne(@Param("id") id: string) {
    return this.notificationsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update a notification by ID (Admin only)" })
  @ApiParam({ name: "id", description: "Notification ID" })
  @ApiBody({ type: UpdateNotificationDto })
  @ApiResponse({ status: 200, description: "Notification updated." })
  @ApiResponse({ status: 404, description: "Notification not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete a notification by ID (Admin only)" })
  @ApiParam({ name: "id", description: "Notification ID" })
  @ApiResponse({ status: 200, description: "Notification deleted." })
  @ApiResponse({ status: 404, description: "Notification not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(id);
  }
}
