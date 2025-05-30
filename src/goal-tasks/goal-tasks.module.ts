import { Module } from '@nestjs/common';
import { GoalTasksService } from './goal-tasks.service';
import { GoalTasksController } from './goal-tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalTask, GoalTaskSchema } from './schemas/goal-task.schema';
import { Goal, GoalSchema } from '../goals/schemas/goal.schema';
import { Task, TaskSchema } from '../tasks/schemas/task.schema';
import { GoalsModule } from '../goals/goals.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:GoalTask.name,schema:GoalTaskSchema},
    {name: Goal.name,schema:GoalSchema},
    {name:Task.name,schema:TaskSchema}
  ]),GoalsModule,TasksModule],
  controllers: [GoalTasksController],
  providers: [GoalTasksService],
})
export class GoalTasksModule {}
