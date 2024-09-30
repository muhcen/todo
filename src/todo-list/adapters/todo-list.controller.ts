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
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/application/guard/jwt-auth.guard';
import { CreateTodoListDto } from '../application/dto/create-todo-list.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../application/commands/create-todo-list.command';

@ApiBearerAuth()
@ApiTags('todo-lists')
@Controller('todo-lists')
export class TodoListsController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a new Todo List' })
  @ApiResponse({ status: 201, description: 'Todo List created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodoList(
    @Body() createTodoListDto: CreateTodoListDto,
    @Request() req: any,
  ) {
    const userId = req.user.userId;
    return this.commandBus.execute(
      new CreateTodoListCommand(createTodoListDto.title, userId),
    );
  }
}
