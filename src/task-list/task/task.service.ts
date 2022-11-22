import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Utils } from 'src/utils/utils';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService, private utils: Utils) {}

  async create(
    createTaskDto: CreateTaskDto,
    taskListId: string,
    userId: number,
  ) {
    const taskList = await this.utils.getTaskList(taskListId, this.prisma);
    const { hasCreateRight, isOwner } = await this.utils.toCheckIsItAllow(
      taskListId,
      userId,
      this.prisma,
    );
    createTaskDto.taskListId = taskListId;

    if (taskList && (hasCreateRight || isOwner))
      return this.prisma.task.create({
        data: createTaskDto,
      });
    throw new Error('Oops');
  }

  findAll(taskListId: string, userId: number) {
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
