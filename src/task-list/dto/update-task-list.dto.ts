import { PartialType } from '@nestjs/mapped-types';
import { User } from '@prisma/client';
import { CreateTaskListDto } from './create-task-list.dto';

export class UpdateTaskListDto extends PartialType(CreateTaskListDto) {
  title?: string;
}
