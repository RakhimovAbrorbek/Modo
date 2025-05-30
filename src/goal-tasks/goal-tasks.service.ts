import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GoalTask } from "./schemas/goal-task.schema";
import { CreateGoalTaskDto } from "./dto/create-goal-task.dto";
import { UpdateGoalTaskDto } from "./dto/update-goal-task.dto";
import { GoalsService } from "../goals/goals.service";
import { TasksService } from "../tasks/tasks.service";

@Injectable()
export class GoalTasksService {
  constructor(
    @InjectModel(GoalTask.name) private readonly goalTaskModel: Model<GoalTask>,
    private readonly goalService: GoalsService,
    private readonly taskService: TasksService
  ) {}

  async create(createGoalTaskDto: CreateGoalTaskDto) {
    const { taskId, goalId } = createGoalTaskDto;

    const goal = await this.goalService.findOne(goalId);
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${goalId} not found`);
    }

    const task = await this.taskService.findOne(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    const newGoalTask = await this.goalTaskModel.create(createGoalTaskDto)
    return newGoalTask
  }

  async findAll(): Promise<GoalTask[]> {
    return this.goalTaskModel.find().populate("taskId").populate("goalId")
  }

  async findOne(id: string): Promise<GoalTask> {
    const goalTask = await this.goalTaskModel.findById(id).populate('taskId').populate("goalId")
    if (!goalTask) {
      throw new NotFoundException(`GoalTask with ID ${id} not found`);
    }
    return goalTask;
  }

  async update(
    id: string,
    updateGoalTaskDto: UpdateGoalTaskDto
  ): Promise<GoalTask> {
    const updated = await this.goalTaskModel.findByIdAndUpdate(
      id,
      updateGoalTaskDto,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundException(`GoalTask with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.goalTaskModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`GoalTask with ID ${id} not found`);
    }
    return { deleted: true };
  }
}
