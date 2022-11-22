import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  Get,
  Res,
  Req,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply } from 'fastify';
import { User, User as UserModel } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { FastifyRequest } from 'fastify';
import { ReqCustom } from '../types/types';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) res: FastifyReply) {
    const { access_token } = await this.authService.signToken(req.user);
    res.setCookie('jwt', access_token);
    return req.user;
  }

  @Post('/signup')
  async signupUser(
    @Body() userData: User,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<User> {
    const newUser = await this.userService.createUser(userData);
    const { access_token } = await this.authService.signToken(newUser);
    res.setCookie('jwt', access_token);
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: ReqCustom) {
    return this.userService.user({ id: req.user.userId.toString() });
  }

  @Get('/users')
  getAllUsers() {
    return this.userService.users({});
  }
  @Delete('/users')
  deleteAllUsers() {
    return this.userService.deleteAllUsers();
  }
}
