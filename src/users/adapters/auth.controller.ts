import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { SignupUserCommand } from '../application/commands/signup-user.command';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    return this.commandBus.execute(new SignupUserCommand(username, password));
  }
}
