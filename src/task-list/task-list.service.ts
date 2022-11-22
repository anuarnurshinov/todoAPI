import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskList } from '@prisma/client';
import { RightsDto } from './dto/rights.dto';
import { Utils } from '../utils/utils';

@Injectable()
export class TaskListService {
  constructor(private prisma: PrismaService, private utils: Utils) {}

  async create(data: TaskList): Promise<TaskList> {
    return this.prisma.taskList.create({
      data: {
        title: data.title,
        authorId: data.authorId,
      },
    });
  }

  async findAll(userId: number): Promise<TaskList[]> {
    return this.prisma.taskList.findMany({
      where: {
        OR: [
          {
            authorId: userId.toString(),
          },
          {
            canSeeBy: {
              some: {
                id: userId.toString(),
              },
            },
          },
          {
            canEditBy: {
              some: {
                id: userId.toString(),
              },
            },
          },
          {
            canDeleteBy: {
              some: {
                id: userId.toString(),
              },
            },
          },
          {
            canCreateBy: {
              some: {
                id: userId.toString(),
              },
            },
          },
        ],
      },
      include: {
        canEditBy: true,
        createdBy: true,
      },
    });
  }

  async findOne(id: string, userId: number): Promise<TaskList[]> {
    console.log(id);
    return await this.prisma.taskList.findMany({
      where: {
        AND: [
          { id },
          {
            OR: [
              {
                canSeeBy: {
                  some: { id: userId.toString() },
                },
              },
              {
                canEditBy: {
                  some: { id: userId.toString() },
                },
              },
              {
                canCreateBy: {
                  some: { id: userId.toString() },
                },
              },
              {
                canDeleteBy: {
                  some: { id: userId.toString() },
                },
              },
              {
                createdBy: {
                  id: userId.toString(),
                },
              },
            ],
          },
        ],
      },
      include: {
        canCreateBy: true,
        canDeleteBy: true,
        canEditBy: true,
        canSeeBy: true,
        createdBy: true,
      },
    });
  }

  async giveRights(right: RightsDto, taskListId: string): Promise<TaskList> {
    const [field] = Object.keys(right);
    return this.prisma.taskList.update({
      data: {
        [field]: {
          connect: {
            id: right[field],
          },
        },
      },
      where: {
        id: taskListId,
      },
      include: {
        canEditBy: true,
        canSeeBy: true,
        canCreateBy: true,
        canDeleteBy: true,
      },
    });
  }

  async updateName(
    id: string,
    tittle: string,
    userId: number,
  ): Promise<TaskList> {
    const { hasEditRight, isOwner } = await this.utils.toCheckIsItAllow(
      id,
      userId,
      this.prisma,
    );
    if (hasEditRight || isOwner)
      return this.prisma.taskList.update({
        data: {
          title: {
            set: tittle,
          },
        },
        where: {
          id,
        },
      });
    throw new Error('У вас нет прав');
  }

  async remove(id: string, userId: number) {
    const { hasDeleteRight, isOwner } = await this.utils.toCheckIsItAllow(
      id,
      userId,
      this.prisma,
    );

    if (hasDeleteRight || isOwner)
      return this.prisma.taskList.delete({
        where: {
          id,
        },
      });
    throw new Error('Нет прав');
  }
  //delete this below!!!
  async removeAll() {
    return this.prisma.taskList.deleteMany({});
  }

  async adminFindAll() {
    return this.prisma.taskList.findMany({
      where: {},
      include: {
        canEditBy: true,
        canSeeBy: true,
        canCreateBy: true,
        canDeleteBy: true,
      },
    });
  }
}
