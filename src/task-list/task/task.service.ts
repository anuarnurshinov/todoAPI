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
    const isItPossible = await this.utils.checkIsItPossible(
      taskListId,
      userId,
      'canCreate',
    );
    createTaskDto.taskListId = taskListId;

    if (isItPossible)
      return this.prisma.task.create({
        data: createTaskDto,
      });
    throw new Error('Oops');
  }

  async findAll(taskListId: string, userId: number) {
    const isItPossible = await this.utils.checkIsItPossible(
      taskListId,
      userId,
      'canSee',
    );
    if (isItPossible)
      return this.prisma.task.findMany({
        where: {
          taskListId: taskListId,
        },
      });
  }

  async findOne(id: string, taskListId: string, userId: number) {
    const isItPossible = await this.utils.checkIsItPossible(
      taskListId,
      userId,
      'canSee',
    );
    if (isItPossible) {
      const [task] = await this.prisma.task.findMany({
        where: {
          AND: [
            {
              id,
            },
            {
              taskListId,
            },
          ],
        },
      });
      return task;
    }
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    taskListId: string,
    userId: number,
  ) {
    const isItPossible = await this.utils.checkIsItPossible(
      taskListId,
      userId,
      'canSee',
    );

    if (isItPossible)
      return this.prisma.task.update({
        data: {
          isDone: {
            set: updateTaskDto.isDone,
          },
          title: {
            set: updateTaskDto.title,
          },
        },
        where: {
          id,
        },
      });
  }

  async remove(id: string, taskListId: string, userId: number) {
    const isItPossible = await this.utils.checkIsItPossible(
      taskListId,
      userId,
      'canSee',
    );

    if (isItPossible)
      return this.prisma.task.delete({
        where: {
          id,
        },
      });
  }
}
