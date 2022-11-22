import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.user({ username });
    if (user) {
      const matched = await comparePasswords(pass, user.password);
      if (matched) {
        const { password, ...result } = user;
        return result;
      }
      console.log('Password incorrect');

      return null;
    }
    return null;
  }

  async signToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
