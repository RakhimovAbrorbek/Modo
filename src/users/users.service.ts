import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userSchema:Model<User>){}
  async create(createUserDto: CreateUserDto) {
    const {confirmPassword,password,...otherDto} = createUserDto
    if(password!==confirmPassword){
       throw new BadRequestException("Password do not match")
    }
    const hashedPassword = await bcrypt.hash(password,7)
    const newUser = this.userSchema.create({password:hashedPassword,...otherDto})
    return {message:"User signed up successfully!",
      user:plainToInstance(UserResponseDto,(await newUser).toObject())
    }
  }

  async findAll() {
    const users =  await this.userSchema.find({}).lean()
    return plainToInstance(UserResponseDto,users)
  }

  async findOne(id:string) {
    const existingUser = await this.userSchema.findOne({_id:id}).lean()
    if(!existingUser){
      throw new BadRequestException("User Not Found")
    }
    return plainToInstance(UserResponseDto,existingUser)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)
    const updatedUser = await this.userSchema.findByIdAndUpdate(id,updateUserDto).lean()
    return plainToInstance(UserResponseDto,updatedUser)     
  }

  async remove(id: string) {
    const user = await this.userSchema.findOne({_id:id})
    if(!user){
      throw new BadRequestException("User Not Found")
    }
    await this.userSchema.deleteOne({_id:id})
    return {message: "User Deleted Successfully!"}
  }
}
