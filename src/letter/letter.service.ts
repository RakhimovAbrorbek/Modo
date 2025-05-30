import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, isValidObjectId } from "mongoose";
import { CreateLetterDto } from "./dto/create-letter.dto";
import { UpdateLetterDto } from "./dto/update-letter.dto";
import { Letter } from "./schemas/letter.entity";
import { GoalsService } from "../goals/goals.service";

@Injectable()
export class LetterService {
  constructor(
    @InjectModel(Letter.name) private readonly letterModel: Model<Letter>,
    private readonly goalService: GoalsService
  ) {}

  async create(createLetterDto: CreateLetterDto): Promise<Letter> {
    const { goalId, ...rest } = createLetterDto;

    if (!isValidObjectId(goalId)) {
      throw new BadRequestException("Invalid Goal ID");
    }

    const goal = await this.goalService.findOne(goalId);
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${goalId} not found`);
    }

    const newLetter = new this.letterModel({
      ...rest,
      goalId,
    });

    return newLetter.save();
  }

  async findAll(): Promise<Letter[]> {
    return this.letterModel.find().exec();
  }

  async findOne(id: string): Promise<Letter> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid letter ID");
    }

    const letter = await this.letterModel.findById(id);
    if (!letter) {
      throw new NotFoundException(`Letter with ID ${id} not found`);
    }

    return letter;
  }

  async update(id: string, updateLetterDto: UpdateLetterDto): Promise<Letter> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid letter ID");
    }

    const updated = await this.letterModel.findByIdAndUpdate(
      id,
      updateLetterDto,
      { new: true }
    );
    if (!updated) {
      throw new NotFoundException(`Letter with ID ${id} not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid letter ID");
    }

    const result = await this.letterModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Letter with ID ${id} not found`);
    }

    return { deleted: true };
  }
}
