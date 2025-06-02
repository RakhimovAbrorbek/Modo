import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { UserDocument } from "../users/schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../users/dto/sign-in.dto";
import e, { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AdminDocument } from "../admin/entities/admin.entity";
import { AdminService } from "../admin/admin.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UsersService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService
  ) {}



  async signUpUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.UserService.findByEmail(email);
    if (user) {
      throw new BadRequestException(
        "You already have an account with these email! Please Log In"
      );
    }
    return this.UserService.create(createUserDto);
  }

  async generateTokenForUser(user: UserDocument) {
    const payload = {
      id: user.id,
      isVerified: user.isVerified,
      email: user.email,
      role: "user"
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async signInUser(signInDto: SignInDto, res: Response) {
    const user = await this.UserService.findByEmail(signInDto.email);
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    if (user.isVerified != true) {
      throw new BadRequestException(
        "User have not verified the account! Check Your Email"
      );
    }
    const isValid = await bcrypt.compare(signInDto.password, user.password);
    if (!isValid) {
      throw new BadRequestException("Email or Password Is Incorrect!");
    }
    const { accessToken, refreshToken } = await this.generateTokenForUser(user);
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    user.refreshToken = hashed_refresh_token;
    await user.save();
    return { message: `Welcome to Modo  ${user.firstName} 🔥`, accessToken };
  }

  async signOutuser(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Token Not Found");
    }
    const user = await this.UserService.findByToken(refresh_token);
    if (!user) {
      throw new BadRequestException("Token Did Not Work");
    }

    user.refreshToken = "";
    await user.save();

    res.clearCookie("refresh_token");

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  }

  async refreshTokenUser(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token Not Found!");
    }

    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const user = await this.UserService.findUserDocument(payload.id);
    if (!user || user.refreshToken === "") {
      throw new UnauthorizedException("User not found or have not logged in yet");
    }
    const isValid = await bcrypt.compare(refresh_token, user.refreshToken);
    if (!isValid) {
      throw new UnauthorizedException("Refresh Token is Invalid");
    }

    const { accessToken, refreshToken } = await this.generateTokenForUser(user);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    user.refreshToken = hashed_refresh_token;
    await user.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      token: accessToken,
    });
  }

  ///========================================================AUTHENTIFICATION FOR AUTH=======================================================


  async generateTokenForAdmin(admin: AdminDocument) {
    const payload = {
      id: admin.id,
      isCreator: admin.isCreator,
      email: admin.email,
      role: "admin"
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async signInAdmin(signInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findByEmail(signInDto.email);
    if (!admin) {
      throw new BadRequestException("Admin Not Found");
    }
    const isValid = await bcrypt.compare(signInDto.password, admin.password);
    if (!isValid) {
      throw new BadRequestException("Email or Password Is Incorrect!");
    }
    const { accessToken, refreshToken } = await this.generateTokenForAdmin(admin);
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.refreshToken = hashed_refresh_token;
    await admin.save();
    return { message: `Welcome to Modo  ${admin.username} 🔥`, accessToken };
  }

  async signOutAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token Not Found");
    }
    const admin = await this.adminService.findByToken(refresh_token);
    if (!admin) {
      throw new BadRequestException("Token Did not Work!");
    }

    admin.refreshToken = "";
    await admin.save();

    res.clearCookie("refresh_token");

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  }

  async refreshTokenAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token Not Found");
    }

    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const admin = await this.adminService.findUserDocument(payload.id);
    if (!admin || admin.refreshToken === "") {
      throw new UnauthorizedException("Admin Not Found");
    }
    const isValid = await bcrypt.compare(refresh_token, admin.refreshToken);
    if (!isValid) {
      throw new UnauthorizedException("Invalid Refresh Token");
    }

    const { accessToken, refreshToken } = await this.generateTokenForAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.refreshToken = hashed_refresh_token;
    await admin.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      token: accessToken,
    });
  }
}
