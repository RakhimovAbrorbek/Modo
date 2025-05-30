import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInsightDto } from './dto/create-insight.dto';
import { UpdateInsightDto } from './dto/update-insight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Insight } from './schema/insight.schema';
import { isValidObjectId, Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class InsightsService {
  constructor(@InjectModel(Insight.name) private readonly insightSchema:Model<Insight>,
  private readonly userService:UsersService
  ){}

  async create(createInsightDto: CreateInsightDto) {
     if (!isValidObjectId(createInsightDto.userId)) {
       throw new BadRequestException("User Id is invalid");
     }
     const user = await this.userService.findOne(createInsightDto.userId);
     if (!user) {
       throw new BadRequestException("User not found with the given id");
     }
     const insight = await this.insightSchema.create(createInsightDto)
     return insight
  }

  findAll() {
    return this.insightSchema.find({}).populate("userId")
  }

  findOne(id: string) {
  const insight = this.insightSchema.findById(id).populate("userId")
  if(!insight){
    throw new BadRequestException("Insight not found with the given id")
  }
  return insight
  }

  async update(id: string, updateInsightDto: UpdateInsightDto) {
    const insight = this.insightSchema.findById(id).populate("userId");
    if (!insight) {
      throw new BadRequestException("Insight not found with the given id");
    }
    const updated = await this.insightSchema.findByIdAndUpdate(id,updateInsightDto)
    return updated
  }

  async remove(id: string) {
    const insight = this.insightSchema.findById(id).populate("userId");
    if (!insight) {
      throw new BadRequestException("Insight not found with the given id");
    }
    await this.insightSchema.findByIdAndDelete(id)
    return {message:"Insight Deleted!"}
  }
}
