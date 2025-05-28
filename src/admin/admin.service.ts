import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './entities/admin.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { plainToInstance } from 'class-transformer';
import { AdminResponseDto } from './dto/admin.response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminSchema: Model<Admin>,
    private readonly jwtService:JwtService
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { confirmPassword, password, ...otherDto } = createAdminDto;
    if (password !== confirmPassword) {
      throw new BadRequestException("Password do not match");
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const createdAdmin = new this.adminSchema({
      password: hashedPassword,
      ...otherDto,
    });
    await createdAdmin.save();
    return {
      message:
        "Admin Added!",
      user: plainToInstance(AdminResponseDto, createdAdmin.toObject()),
    };
  }

  async findAll() {
    const admins = await this.adminSchema.find({}).lean();
    return plainToInstance(AdminResponseDto, admins);
  }

  async findOne(id: string) {
    const existingAdmin = await this.adminSchema.findOne({ _id: id }).lean();
    if (!existingAdmin) {
      throw new BadRequestException("Admin Not Found");
    }
    return plainToInstance(AdminResponseDto, existingAdmin);
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);
    const updatedUser = await this.adminSchema
      .findByIdAndUpdate(id, updateAdminDto)
      .lean();
    return plainToInstance(AdminResponseDto, updatedUser);
  }

  async remove(id: string) {
    const admin = await this.adminSchema.findById(id);
    if (!admin) {
      throw new BadRequestException("Admin Not Found");
    }
    await this.adminSchema.findByIdAndDelete(id);
    return { message: "Admin Deleted Account!" };
  }

  async findByToken(refresh_token: string): Promise<AdminDocument | null> {
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not provided!");
    }
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      }) as { id: string };
      const admin = await this.adminSchema.findOne({ _id: decoded.id }).exec();
      return admin
    } catch (error) {
      throw new BadRequestException("Invalid or expired refresh token!");
    }
  }
  async findUserDocument(id: string) {
    return this.adminSchema.findById(id);
  }
  async saveUser(admin: AdminDocument, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      admin.refreshToken = await bcrypt.hash(refreshToken, 7);
    }
    await admin.save();
  }
  async findByEmail(email:string){
    return this.adminSchema.findOne({email})
  }
}
