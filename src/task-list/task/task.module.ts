import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { Utils } from '../../utils/utils';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, Utils],
})
export class TaskModule {}
