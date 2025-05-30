import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from "./mail/mail.module";
import { AdminModule } from './admin/admin.module';
import { TasksModule } from './tasks/tasks.module';
import { RemindersModule } from './reminders/reminders.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UpdatesModule } from './updates/updates.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SettingsModule } from './settings/settings.module';
import { InsightsModule } from './insights/insights.module';
import { StreaksModule } from './streaks/streaks.module';
import { GoalsModule } from './goals/goals.module';
import { GoalTasksModule } from './goal-tasks/goal-tasks.module';
import { LetterModule } from './letter/letter.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UsersModule,
    AuthModule,
    MailModule,
    AdminModule,
    TasksModule,
    RemindersModule,
    NotificationsModule,
    UpdatesModule,
    StatisticsModule,
    SettingsModule,
    InsightsModule,
    StreaksModule,
    GoalsModule,
    GoalTasksModule,
    LetterModule
  ],
})
export class AppModule {}
