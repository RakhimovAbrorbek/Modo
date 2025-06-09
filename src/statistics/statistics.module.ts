import { forwardRef, Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Statistic, StatisticSchema } from './schemas/statistic.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Statistic.name, schema: StatisticSchema },
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => UsersModule),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
