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
} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskList } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { ReqCustom } from '../types/types';
import { RightsDto } from './dto/rights.dto';

@Controller('task-list')
export class TaskListController {
  constructor(
    private readonly taskListService: TaskListService,
    private usersService: UserService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() taskList: TaskList, @Req() req: ReqCustom) {
    taskList.authorId = req.user.userId.toString();
    return this.taskListService.create(taskList);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: ReqCustom) {
    return this.taskListService.findAll(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: ReqCustom) {
    return this.taskListService.findOne(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('give-right/:id')
  giveRight(
    @Param('id') id: string,
    @Body()
    right: RightsDto,
  ) {
    return this.taskListService.giveRights(right, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateTitle(
    @Param('id') id: string,
    @Req() req: ReqCustom,
    @Body()
    title: {
      title: string;
    },
  ) {
    return this.taskListService.updateName(id, title.title, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: ReqCustom) {
    return this.taskListService.remove(id, req.user.userId);
  }

  //Remove this below!!!

  @Delete()
  removeAll() {
    return this.taskListService.removeAll();
  }

  @Get('adminFind')
  findAllAdmin() {
    return this.taskListService.adminFindAll();
  }
}
