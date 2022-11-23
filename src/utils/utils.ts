import { PrismaService } from 'prisma/prisma.service';
import { TaskList } from '@prisma/client';
import { Injectable } from '@nestjs/common';

interface userRights {
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
  canSee: boolean;
  isOwner: boolean;
}
@Injectable()
export class Utils {
  constructor(private readonly prisma: PrismaService) {}
  async checkUserRights(id: string, userId: number): Promise<userRights> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId.toString(),
      },
      include: {
        canEdit: true,
        created: true,
        canDelete: true,
        canCreate: true,
        canSee: true,
      },
    });

    const rightsObj = {
      canEdit: false,
      canDelete: false,
      canCreate: false,
      canSee: false,
      created: false,
    };

    for (const el in rightsObj) {
      rightsObj[el] = user[el].find((el: TaskList) => {
        return el.id === id;
      })
        ? true
        : false;
    }

    return { ...rightsObj, isOwner: rightsObj.created };
  }

  async getTaskList(id: string) {
    return await this.prisma.taskList.findUnique({
      where: {
        id,
      },
    });
  }

  async checkIsItPossible(
    taskListId: string,
    userId: number,

    right: 'canEdit' | 'canDelete' | 'canCreate' | 'canSee',
  ) {
    const taskList = await this.getTaskList(taskListId);
    const rightsObject = await this.checkUserRights(taskListId, userId);

    if (taskList && (rightsObject[right] || rightsObject.isOwner)) return true;
    return false;
  }
}
