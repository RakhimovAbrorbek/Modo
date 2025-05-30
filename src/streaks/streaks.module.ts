import { Module } from '@nestjs/common';
import { StreaksService } from './streaks.service';
import { StreaksController } from './streaks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Streak, StreakSchema } from './schema/streak.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Streak.name,schema:StreakSchema},
    {name:User.name,schema:UserSchema}
  ]),UsersModule],
  controllers: [StreaksController],
  providers: [StreaksService],
})
export class StreaksModule {}
