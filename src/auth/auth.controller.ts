import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Res,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "../users/dto/sign-in.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Request, Response } from "express";
import { JwtAuthGuard } from "../common/guards/jwt.auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";


@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up-user")
  @HttpCode(200)
  @ApiOperation({ summary: "User registration" })
  @ApiResponse({ status: 200, description: "User registered successfully" })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpUser(createUserDto);
  }

  @Post("sign-in-user")
  @HttpCode(200)
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "User signed in successfully" })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInUser(signInDto, res);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("user")
  @Post("sign-out-user")
  @HttpCode(200)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "User logout" })
  @ApiResponse({ status: 200, description: "User signed out successfully" })
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutuser(req, res);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("user")
  @Get("refresh-user")
  @HttpCode(200)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Refresh user token" })
  @ApiResponse({ status: 200, description: "User token refreshed" })
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenUser(req, res);
  }

  @Post("sign-in-admin")
  @HttpCode(200)
  @ApiOperation({ summary: "Admin login" })
  @ApiResponse({ status: 200, description: "Admin signed in successfully" })
  async sigInAdmin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post("sign-out-admin")
  @HttpCode(200)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Admin logout" })
  @ApiResponse({ status: 200, description: "Admin signed out successfully" })
  async signOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(req, res);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get("refresh-admin")
  @HttpCode(200)
  @ApiBearerAuth("access-token")
  @ApiOperation({ summary: "Refresh admin token" })
  @ApiResponse({ status: 200, description: "Admin token refreshed" })
  async refreshTokenAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(req, res);
  }
}
