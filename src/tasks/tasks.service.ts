import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { isValidObjectId, Model, Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { TaskFilterDto } from './dto/task.filter.dto';


@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskSchema: Model<Task>,
  private readonly userService:UsersService
  ){}
   async create(createTaskDto: CreateTaskDto) {
    const {userId} = createTaskDto
    if(!isValidObjectId(userId)){
       throw new BadRequestException("Id of User is not valid!")
    }
    const user = await this.userService.findOne(userId)
    if(!user){
      throw new BadRequestException("User not found with the given ID")
    }
    const newTask = await this.taskSchema.create(createTaskDto)
    return {message:"Task Created Successfully!",newTask}
  }

  findAll() {
    return this.taskSchema.find({}).populate("userId")
  }

  async findOne(id: string) {
     if (!isValidObjectId(id)) {
       throw new BadRequestException("Id is invalid");
     }
   const task = await this.taskSchema.findById(id).populate("userId")
   if(!task){
    throw new BadRequestException("Task not found with the given Id")
   }
   return task
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
     if (!isValidObjectId(id)) {
       throw new BadRequestException("Id is invalid");
     }
    const task  = await this.taskSchema.findById(id)
    if(!task){
      throw new BadRequestException("Task not found with the given Id")
    }
    return this.taskSchema.findByIdAndUpdate(id,updateTaskDto).populate('userId')
  }

  async remove(id: string) {
     if (!isValidObjectId(id)) {
       throw new BadRequestException("Id is invalid");
     }
     const task = await this.taskSchema.findById(id);
     if (!task) {
       throw new BadRequestException("Task not found with the given Id");
     }
     await this.taskSchema.findByIdAndDelete(id)
     return {message:"Task deleted successfully"}
  }
  async FindUndoneTasksByUserId(taskFilterDto:TaskFilterDto){
    if(!taskFilterDto.userId){
      throw new BadRequestException("User Id is not provided")
    }
    const {userId} = taskFilterDto
    const tasks = await this.taskSchema.find({
      userId,
      isCompleted:false
    }).exec()
    return tasks
  }
}
