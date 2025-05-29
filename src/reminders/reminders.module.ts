import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reminder, ReminderSchema } from './schemas/reminder.schema';;
import { Task, TaskSchema } from '../tasks/schemas/task.schema';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Reminder.name,schema:ReminderSchema},
    {name:Task.name,schema:TaskSchema}
  ]),TasksModule],
  controllers: [RemindersController],
  providers: [RemindersService],
  exports:[RemindersService]
})
export class RemindersModule {}
