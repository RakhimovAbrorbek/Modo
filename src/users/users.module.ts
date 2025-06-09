import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { MailModule } from '../mail/mail.module';
import { FileModule } from '../file/file.module';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:User.name,schema:UserSchema}
  ]),MailModule,FileModule,forwardRef(() => StatisticsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
