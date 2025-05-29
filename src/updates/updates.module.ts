import { Module } from '@nestjs/common';
import { UpdatesService } from './updates.service';
import { UpdatesController } from './updates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Update, UpdateSchema } from './schemas/update.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Update.name,schema:UpdateSchema}
  ])],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
