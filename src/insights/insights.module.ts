import { Module } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Insight, InsightSchema } from './schema/insight.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Insight.name,schema:InsightSchema},
    {name:User.name,schema:UserSchema}
  ]),UsersModule],
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule {}
