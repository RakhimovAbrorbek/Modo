import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private readonly notificationSchema: Model<Notification>,
  private readonly userService:UsersService
  ){}
  async create(createNotificationDto: CreateNotificationDto) {
    if(!isValidObjectId(createNotificationDto.userId)){
      throw new BadRequestException("User Id is invalid")
    }
    const user = await this.userService.findOne(createNotificationDto.userId)
    if(!user){
      throw new BadRequestException("User not found with the given id")
    }
    const newNotification = await this.notificationSchema.create(createNotificationDto)
    return newNotification
  }

  findAll() {
    return this.notificationSchema.find({}).populate("userId")
  }

  async findOne(id: string) {
    const notification = await this.notificationSchema.findById(id).populate("userId")
    if(notification){
      throw new BadRequestException("Notification id is not found")
    }
    return notification
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationSchema
      .findById(id)
      .populate("userId");
    if (!notification) {
      throw new BadRequestException("Notification id is not found");
    }
    const updatedNotification = await this.notificationSchema.findByIdAndUpdate(id)
    return updatedNotification
  }

  async remove(id: string) {
     const notification = this.notificationSchema
       .findById(id)
     if (!notification) {
       throw new BadRequestException("Notification id is not found");
     }
     await this.notificationSchema.findByIdAndDelete(id)
     return {message:"Notification deleted"}
  }
}
