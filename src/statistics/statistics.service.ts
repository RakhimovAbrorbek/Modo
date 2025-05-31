import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Statistic } from './schemas/statistic.schema';
import { isValidObjectId, Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class StatisticsService {
  constructor(@InjectModel(Statistic.name) private readonly statsSchema:Model<Statistic>,
  private readonly userService:UsersService
  ){}
  async create(createStatisticDto: CreateStatisticDto) {
     if (!isValidObjectId(createStatisticDto.userId)) {
       throw new BadRequestException("User Id is invalid");
     }
     const user = await this.userService.findOne(createStatisticDto.userId);
     if (!user) {
       throw new BadRequestException("User not found with the given id");
     }
     const newStats = await this.statsSchema.create(createStatisticDto)
     return newStats
  }

  findAll() {
    return this.statsSchema.find({}).populate("userId")
  }

  async findOne(id: string) {
     if (!isValidObjectId(id)) {
       throw new BadRequestException("Id is invalid");
     }
   const stats = await this.statsSchema.findById(id)
   if(!stats){
    throw new BadRequestException("Stats not found")
   }
   return stats
  }

  async update(id: string, updateStatisticDto: UpdateStatisticDto) {
     if (!isValidObjectId(id)) {
       throw new BadRequestException("Id is invalid");
     }
    const stats = await this.statsSchema.findById(id);
    if (!stats) {
      throw new BadRequestException("Stats not found");
    }
    const updated = await this.statsSchema.findByIdAndUpdate(id,updateStatisticDto)
    return updated
  }

  async remove(id: string) {
     if (!isValidObjectId(id)) {
       throw new BadRequestException("Id is invalid");
     }
    const stats = await this.statsSchema.findById(id);
    if (!stats) {
      throw new BadRequestException("Stats not found");
    }
    await this.statsSchema.findByIdAndDelete(id)
    return {message:"User statistis deleted"}
  }
}
