import { Module } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { Utils } from '../utils/utils';
import { TaskModule } from './task/task.module';

@Module({
  controllers: [TaskListController],
  providers: [TaskListService, PrismaService, UserService, Utils],
  imports: [TaskModule],
})
export class TaskListModule {}
