import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskListModule } from './task-list/task-list.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    UserModule,
    TaskListModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
