import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
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
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { JwtSelfGuard } from "../common/guards/self.guard";
import { CreatorGuard } from "../common/guards/creator.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("admin")
@ApiBearerAuth("access-token")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard,RolesGuard, CreatorGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Create a new admin" })
  @ApiResponse({
    status: 201,
    description: "Admin created successfully",
    type: CreateAdminDto,
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard, CreatorGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({
    status: 200,
    description: "List of admins",
    type: [CreateAdminDto],
  })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard,RolesGuard, JwtSelfGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get admin by id" })
  @ApiResponse({
    status: 200,
    description: "Admin details",
    type: CreateAdminDto,
  })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(id);
  }



  @UseGuards(JwtAuthGuard,RolesGuard, CreatorGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update admin by id" })
  @ApiResponse({
    status: 200,
    description: "Admin updated",
    type: UpdateAdminDto,
  })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }


  @UseGuards(JwtAuthGuard,RolesGuard, CreatorGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete admin by id" })
  @ApiResponse({ status: 200, description: "Admin deleted" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(id);
  }
}
