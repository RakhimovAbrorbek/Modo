import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStreakDto } from './dto/create-streak.dto';
import { UpdateStreakDto } from './dto/update-streak.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Streak } from './schema/streak.schema';
import { isValidObjectId, Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class StreaksService {
  constructor(@InjectModel(Streak.name) private readonly streakSchema: Model<Streak>,  
  private readonly userService: UsersService
   ){}
  async create(createStreakDto: CreateStreakDto) {
     if (!isValidObjectId(createStreakDto.userId)) {
       throw new BadRequestException("User Id is invalid");
     }
     const user = await this.userService.findOne(createStreakDto.userId);
     if (!user) {
       throw new BadRequestException("User not found with the given id");
     }
     const streak = await this.streakSchema.create(createStreakDto)
     return streak
  }

  findAll() {
    return this.streakSchema.find({}).populate("userId")
  }

  findOne(id: string) {
    const streak = this.streakSchema.findById(id).populate("userId")
    if(!streak){
      throw new BadRequestException("Streak not found with the given id")
    }
    return streak
  }

  update(id: string, updateStreakDto: UpdateStreakDto) {
     const streak = this.streakSchema.findById(id).populate("userId");
     if (!streak) {
       throw new BadRequestException("Streak not found with the given id");
     }
     const updated = this.streakSchema.findByIdAndUpdate(id,updateStreakDto)
     return updated
  }

  async remove(id: string) {
    const streak = this.streakSchema.findById(id).populate("userId");
    if (!streak) {
      throw new BadRequestException("Streak not found with the given id");
    }
    await this.streakSchema.findByIdAndDelete(id)
    return {message:"Streak Deleted!"}
  }
}
