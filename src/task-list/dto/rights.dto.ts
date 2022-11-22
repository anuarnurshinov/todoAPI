import { PartialType } from '@nestjs/mapped-types';
import { User } from '@prisma/client';
import { CreateTaskListDto } from './create-task-list.dto';

export class RightsDto extends PartialType(CreateTaskListDto) {
  canSeeBy?: string;
  canEditBy?: string;
  canDeleteBy?: string;
  canCreateBy?: string;
}
