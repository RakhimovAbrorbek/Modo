import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../users/dto/sign-in.dto';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up-user")
  @HttpCode(200)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpUser(createUserDto);
  }

  @Post("sign-in-user")
  @HttpCode(200)
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInUser(signInDto, res);
  }

  @Post("sign-out-user")
  @HttpCode(200)
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutuser(req, res);
  }

  @Get("refresh-user")
  @HttpCode(200)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenUser(req, res);
  }

  @Post("sign-in-admin")
  @HttpCode(200)
  async sigInAdmin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @Post("sign-out-admin")
  @HttpCode(200)
  async signOutAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(req, res);
  }

  @Get("refresh-admin")
  @HttpCode(200)
  async refreshTokenAdmin(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(req, res);
  }
}
