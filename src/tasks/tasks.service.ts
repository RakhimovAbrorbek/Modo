import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { isValidObjectId, Model, Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { GetTasksDto } from './dto/get-tasks.dto';
import { StatisticsService } from '../statistics/statistics.service';


@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskSchema: Model<Task>,
    private readonly StatisticsService: StatisticsService,
    private readonly userService: UsersService
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const { userId } = createTaskDto;
    if (!isValidObjectId(userId)) {
      throw new BadRequestException("Id of User is not valid!");
    }
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException("User not found with the given ID");
    }
    const newTask = await this.taskSchema.create(createTaskDto);
    await this.StatisticsService.addUserTask(userId)
    return { message: "Task Created Successfully!", newTask };
  }

  findAll() {
    return this.taskSchema.find({}).populate("userId");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is invalid");
    }
    const task = await this.taskSchema.findById(id).populate("userId");
    if (!task) {
      throw new BadRequestException("Task not found with the given Id");
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is invalid");
    }
    const task = await this.taskSchema.findById(id);
    if (!task) {
      throw new BadRequestException("Task not found with the given Id");
    }
    return this.taskSchema
      .findByIdAndUpdate(id, updateTaskDto)
      .populate("userId");
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Id is invalid");
    }
    const task = await this.taskSchema.findById(id);
    if (!task) {
      throw new BadRequestException("Task not found with the given Id");
    }
    await this.taskSchema.findByIdAndDelete(id);
    return { message: "Task deleted successfully" };
  }

  async findNotCompleted(userId: string) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException("Invalid userId");
    }

    const tasks = await this.taskSchema.find({
      userId,
      isCompleted: false,
    });

    return tasks;
  }

  async findCompleted(userId: string) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestException("Invalid userId");
    }
    const tasks = await this.taskSchema.find({
      userId,
      isCompleted: true,
    });

    return tasks;
  }

  async completeTasks(taskId: string) {
    console.log(taskId);
    const task = await this.findOne(taskId);
    task.isCompleted = true;
    await task.save();
    return { message: "Task Done", task };
  }

  async getTasksWithPriority(getTasksDto: GetTasksDto) {
    const { level, userId } = getTasksDto;
    if (!level) {
      throw new BadRequestException("Level is not provided");
    }
    if (!["low", "medium", "high"].includes(level)) {
      throw new BadRequestException("Provided level is invalid");
    }
    if (!isValidObjectId(userId)) {
      throw new BadRequestException("Invalid userId");
    }
    const tasks = await this.taskSchema.find({
      userId,
      prority: level,
    });
    return tasks;
  }
  async getUserWithMostTasks() {
    const result = await this.taskSchema.aggregate([
      {
        $group: {
          _id: "$userId",
          taskCount: { $sum: 1 },
        },
      },
      { $sort: { taskCount: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "users", 
          localField: "_id", 
          foreignField: "_id", 
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          user: 1,
          taskCount: 1,
        },
      },
    ]);

    return result[0] || null;
  }
}