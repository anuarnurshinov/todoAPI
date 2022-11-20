import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserService } from '../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy, UserService, PrismaService],
})
export class AuthModule {}
