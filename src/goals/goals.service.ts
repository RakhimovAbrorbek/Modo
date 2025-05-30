import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Goal } from "./schemas/goal.schema";
import { isValidObjectId, Model } from "mongoose";
import { UsersService } from "../users/users.service";

@Injectable()
export class GoalsService {
  constructor(
    @InjectModel(Goal.name) private readonly goalModel: Model<Goal>,
    private readonly userService: UsersService
  ) {}

  async create(createGoalDto: CreateGoalDto) {
    const { userId } = createGoalDto;

    if (!isValidObjectId(userId)) {
      throw new BadRequestException("User ID is invalid");
    }

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException("User not found with the given ID");
    }

    const createdGoal = new this.goalModel(createGoalDto);
    return createdGoal.save();
  }

  async findAll() {
    return this.goalModel.find().populate("userId")
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid goal ID");
    }

    const goal = await this.goalModel.findById(id).populate("userId")
    if (!goal) {
      throw new NotFoundException(`Goal not found with ID ${id}`);
    }
    return goal;
  }

  async update(id: string, updateGoalDto: UpdateGoalDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid goal ID");
    }

    const updatedGoal = await this.goalModel
      .findByIdAndUpdate(id, updateGoalDto, { new: true })
      .populate("userId")
    if (!updatedGoal) {
      throw new NotFoundException(`Goal not found with ID ${id}`);
    }

    return updatedGoal;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid goal ID");
    }

    const deletedGoal = await this.goalModel.findByIdAndDelete(id)
    if (!deletedGoal) {
      throw new NotFoundException(`Goal not found with ID ${id}`);
    }

    return { message: "Goal deleted successfully" };
  }
}
