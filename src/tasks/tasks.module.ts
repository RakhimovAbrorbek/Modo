import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Task.name,schema:TaskSchema},
    {name:User.name,schema:UserSchema}
  ]),UsersModule,StatisticsModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports:[TasksService]
})
export class TasksModule {}
