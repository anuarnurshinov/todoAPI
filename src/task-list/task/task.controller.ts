import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParamData,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Utils } from '../../utils/utils';
import { ReqCustom } from '../../types/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('task-list/:tasklist/task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly prisma: PrismaService,
    private readonly utils: Utils,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('tasklist') taskListId: string,
    @Req() req: ReqCustom,
  ) {
    return this.taskService.create(createTaskDto, taskListId, req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param('tasklist') taskListId: string, @Req() req: ReqCustom) {
    return this.taskService.findAll(taskListId, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
