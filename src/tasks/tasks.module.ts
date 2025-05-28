import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Task.name,schema:TaskSchema},
    {name:User.name,schema:UserSchema}
  ]),UsersModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
