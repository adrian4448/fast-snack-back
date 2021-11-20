import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Token')
  @UseGuards(AuthGuard('local'))
  @Post('/token')
  async login(@Request() req) {
    return this.authService.login(req);
  }
}
