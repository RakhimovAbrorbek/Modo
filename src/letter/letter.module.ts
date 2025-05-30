import { Module } from '@nestjs/common';
import { LetterService } from './letter.service';
import { LetterController } from './letter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Letter, LetterSchema } from './schemas/letter.entity';
import { Goal, GoalSchema } from '../goals/schemas/goal.schema';
import { GoalsModule } from '../goals/goals.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Letter.name,schema:LetterSchema},
    {name:Goal.name,schema: GoalSchema}
  ]),GoalsModule],
  controllers: [LetterController],
  providers: [LetterService],
})
export class LetterModule {}
