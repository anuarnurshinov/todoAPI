import { PrismaService } from 'prisma/prisma.service';

export class Utils {
  async toCheckIsItAllow(id: string, userId: number, prisma: PrismaService) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId.toString(),
      },
      include: {
        canEdit: true,
        created: true,
        canDelete: true,
        canCreate: true,
      },
    });

    const hasEditRight = user.canEdit.find((el) => {
      return el.id === id;
    });

    const isOwner = user.created.find((el) => {
      console.log(el);
      console.log(el.id);
      console.log(id);

      return el.id === id;
    });

    const hasDeleteRight = user.canDelete.find((el) => {
      return el.id === id;
    });

    const hasCreateRight = user.canCreate.find((el) => {
      return el.id === id;
    });

    return {
      hasEditRight,
      isOwner,
      hasDeleteRight,
      hasCreateRight,
    };
  }
}
