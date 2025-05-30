import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './schemas/setting.schema';
import { isValidObjectId, Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(Setting.name) private readonly settingSchema:Model<Setting>,
  private readonly userService:UsersService
 ){}
  async create(createSettingDto: CreateSettingDto) {
     if (!isValidObjectId(createSettingDto.userId)) {
       throw new BadRequestException("User Id is invalid");
     }
     const user = await this.userService.findOne(createSettingDto.userId);
     if (!user) {
       throw new BadRequestException("User not found with the given id");
     }
     const newSetting = await this.settingSchema.create(createSettingDto)
     return newSetting
  }

  findAll() {
    return this.settingSchema.find({}).populate('userId')
  }

  async findOne(id:string) {
    const settings = await this.settingSchema.findById(id).populate("userId")
    if(!settings){
      throw new BadRequestException("Settings not found with the given id")
    }
    return settings
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    const settings = await this.settingSchema.findById(id).populate("userId");
    if (!settings) {
      throw new BadRequestException("Settings not found with the given id");
    }
    const updatedSetting = await this.settingSchema.findByIdAndUpdate(id,updateSettingDto)
    return updatedSetting
  }

  async remove(id:string) {
      const settings = await this.settingSchema.findById(id).populate("userId");
      if (!settings) {
        throw new BadRequestException("Settings not found with the given id");
      }
    await this.settingSchema.findByIdAndDelete(id)
    return {message:"Setting deleted"}
  }
}
