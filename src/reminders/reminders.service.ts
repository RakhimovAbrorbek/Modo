import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reminder } from './schemas/reminder.schema';
import { isValidObjectId, Model } from 'mongoose';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class RemindersService {
  constructor(@InjectModel(Reminder.name) private readonly reminderSchema:Model<Reminder>,
  private readonly taskService:TasksService
   ){}
  async create(createReminderDto: CreateReminderDto) {
   if(!isValidObjectId(createReminderDto.taskId)){
    throw new BadRequestException("Reminder Id is not valid")
   }
   const task = await this.taskService.findOne(createReminderDto.taskId)
   if(!task){
    throw new BadRequestException("Reminder id not found")
   }
   const newReminder = await this.reminderSchema.create(createReminderDto)
   return newReminder
  }

  findAll() {
    return this.reminderSchema.find({}).populate("taskId")
  }

  findOne(id:string) {
   if(!isValidObjectId(id)){
    throw new BadRequestException("Reminder id is invalid");
   }
   const task =  this.reminderSchema.findById(id).populate("taskId")
   if(!task){
    throw new BadRequestException("Reminder not found")
   }
   return task
  }

  update(id: string, updateReminderDto: UpdateReminderDto) {
     if (!isValidObjectId(id)) {
       throw new BadRequestException("Reminder id is invalid");
     }
     const task = this.reminderSchema.findById(id)
     if (!task) {
       throw new BadRequestException("Reminder not found");
     }
    return this.reminderSchema.findByIdAndUpdate(id,updateReminderDto)
  }

  async remove(id: string) {
      if (!isValidObjectId(id)) {
        throw new BadRequestException("Reminder id is invalid");
      }
      const task = this.reminderSchema.findById(id);
      if (!task) {
        throw new BadRequestException("Reminder not found");
      }
      await this.reminderSchema.findByIdAndDelete(id)
      return {message:"Reminder Deleted"}
  }
}
