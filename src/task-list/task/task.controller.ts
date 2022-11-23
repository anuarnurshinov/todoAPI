import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParamData,
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
    @Param('tasklist') taskListId: ParamData,
    @Req() req: ReqCustom,
  ) {
    return this.taskService.create(
      createTaskDto,
      taskListId.toString(),
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param('tasklist') taskListId: ParamData, @Req() req: ReqCustom) {
    return this.taskService.findAll(taskListId.toString(), req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Param('tasklist') taskListId: string,
    @Req() req: ReqCustom,
  ) {
    return this.taskService.findOne(id, taskListId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('tasklist') taskListId: string,
    @Req() req: ReqCustom,
  ) {
    return this.taskService.update(
      id,
      updateTaskDto,
      taskListId,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Param('tasklist') taskListId: string,
    @Req() req: ReqCustom,
  ) {
    this.taskService.remove(id, taskListId, req.user.userId);
    return null;
  }
}
