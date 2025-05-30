import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoalTasksService } from './goal-tasks.service';
import { CreateGoalTaskDto } from './dto/create-goal-task.dto';
import { UpdateGoalTaskDto } from './dto/update-goal-task.dto';

@Controller('goal-tasks')
export class GoalTasksController {
  constructor(private readonly goalTasksService: GoalTasksService) {}

  @Post()
  create(@Body() createGoalTaskDto: CreateGoalTaskDto) {
    return this.goalTasksService.create(createGoalTaskDto);
  }

  @Get()
  findAll() {
    return this.goalTasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalTasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalTaskDto: UpdateGoalTaskDto) {
    return this.goalTasksService.update(id, updateGoalTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalTasksService.remove(id);
  }
}
