import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User as UserModel } from '@prisma/client';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('user')
  async signupUser(
    @Body() userData: { password: string; name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
