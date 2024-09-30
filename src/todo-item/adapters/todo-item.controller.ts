import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/application/guard/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('todo-items')
@Controller('todo-items')
export class TodoItemController {
  constructor() {}

  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'get profile' })
  // @Get('profile')
  // async getProfile(@Req() req) {
  //   return req.user;
  // }
}
