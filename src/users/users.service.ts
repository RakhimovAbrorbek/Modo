import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { isValidObjectId, Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { FileService } from '../file/file.service';
import { StatisticsService } from '../statistics/statistics.service';
import { CreateStatisticDto } from '../statistics/dto/create-statistic.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userSchema: Model<User>,
    private readonly fileService: FileService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    // private readonly StatisticsService: StatisticsService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { confirmPassword, password, ...otherDto} = createUserDto;
    if (password !== confirmPassword) {
      throw new BadRequestException("Password do not match");
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const createdUser = new this.userSchema({
      password: hashedPassword,
      ...otherDto,
    });
    await createdUser.save();
    try {
      await this.mailService.sendMail(createdUser);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Email Yuborishda Xatolik!");
    }
    // const statisticDto: CreateStatisticDto = {
    //   userId: createdUser.email,
    //   totalTasksCreated: 0,
    //   totalTasksDone: 0,
    // };
    // const userStats = await this.StatisticsService.create(statisticDto)
    return {
      message:
        "User signed up successfully Please Check Your Email to Verify your Account!",
      user: createdUser,
      // stats: userStats
    };
  }

  async findAll() {
    const users = await this.userSchema.find({}).lean();
    return users;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is invalid");
    }
    const existingUser = await this.userSchema.findOne({ _id: id }).lean();
    if (!existingUser) {
      throw new BadRequestException("User Not Found");
    }
    return existingUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is invalid");
    }
    const user = await this.findOne(id);
    if (!user) {
      throw new BadRequestException("User not found with the given id");
    }
    const updatedUser = await this.userSchema
      .findByIdAndUpdate(id, updateUserDto)
      .lean();
    return updatedUser;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is invalid");
    }
    const user = await this.userSchema.findOne({ _id: id });
    if (!user) {
      throw new BadRequestException("User Not Found");
    }
    await this.userSchema.deleteOne({ _id: id });
    return { message: "User Deleted Successfully!" };
  }

  async findByEmail(email: string) {
    return this.userSchema.findOne({ email });
  }
  async findByToken(refresh_token: string): Promise<UserDocument | null> {
    if (!refresh_token) {
      throw new BadRequestException("Refresh Token not provided!");
    }
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      }) as { id: string };
      const user = await this.userSchema.findOne({ _id: decoded.id }).exec();
      return user;
    } catch (error) {
      throw new BadRequestException("Invalid or expired refresh token!");
    }
  }
  async findUserDocument(id: string) {
    return this.userSchema.findById(id);
  }
  async saveUser(user: UserDocument, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      user.refreshToken = await bcrypt.hash(refreshToken, 7);
    }
    await user.save();
  }
  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updatedUser = await this.userSchema.findOne({ activationLink: link });
    if (!updatedUser) {
      throw new BadRequestException("Invalid or Expired Activation Link");
    }
    if (updatedUser.isVerified) {
      throw new BadRequestException("User already activated");
    }
    updatedUser.isVerified = true;
    await updatedUser.save();
    return {
      message: "User activated successfully",
      isVerified: true,
    };
  }

  async updateUserAvatar(userId: string, file: Express.Multer.File) {
    const fileName = this.fileService.saveFile(file, userId);
    await this.userSchema.findByIdAndUpdate(userId, {
      avatar: fileName,
    });

    return { message: "Image successfully saved!", FileName: fileName };
  }
}
