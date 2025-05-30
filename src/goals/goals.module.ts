import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Goal, GoalSchema } from './schemas/goal.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Goal.name,schema:GoalSchema},
    {name:User.name,schema:UserSchema}
  ]),UsersModule],
  controllers: [GoalsController],
  providers: [GoalsService],
  exports:[GoalsService]
})
export class GoalsModule {}
