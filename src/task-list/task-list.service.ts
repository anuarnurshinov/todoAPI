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

  async findOne(id: string, userId: number): Promise<TaskList> {
    const [taskList] = await this.prisma.taskList.findMany({
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
    return taskList;
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
    title: string,
    userId: number,
  ): Promise<TaskList> {
    const { canEdit, isOwner } = await this.utils.checkUserRights(id, userId);
    if (canEdit || isOwner)
      return this.prisma.taskList.update({
        data: {
          title: {
            set: title,
          },
        },
        where: {
          id,
        },
      });
    throw new Error('У вас нет прав');
  }

  async remove(id: string, userId: number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { canDelete, isOwner } = await this.utils.checkUserRights(id, userId);

    if (canDelete || isOwner)
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
