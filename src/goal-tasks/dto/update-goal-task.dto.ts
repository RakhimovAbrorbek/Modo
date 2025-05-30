import { PartialType } from '@nestjs/mapped-types';
import { CreateGoalTaskDto } from './create-goal-task.dto';

export class UpdateGoalTaskDto extends PartialType(CreateGoalTaskDto) {}
