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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/application/guard/jwt-auth.guard';
import { CreateTodoItemDto } from '../application/dto/create-todo-item.dto';
import { CreateTodoItemCommand } from '../application/commands/add-todo-item.command';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteTodoItemCommand } from '../application/commands/delete-todo-item.command';

@ApiBearerAuth()
@ApiTags('todo-items')
@UseGuards(JwtAuthGuard)
@Controller('todo-items')
export class TodoItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Add a Todo Item to a Todo List' })
  @ApiResponse({ status: 201, description: 'Todo Item successfully added.' })
  @ApiResponse({ status: 404, description: 'Todo List not found.' })
  @ApiQuery({
    name: 'todoListId',
    description: 'The ID of the Todo List to which the Todo Item will be added',
    example: '615c3415e9b7a8a1e8f643a7',
  })
  @Post()
  async createTodoItem(
    @Query('todoListId') todoListId,
    @Body() addTodoItemDto: CreateTodoItemDto,
    @Req() req: any,
  ): Promise<void> {
    const userId = req.user.userId;
    const { title, description, priority } = addTodoItemDto;
    return this.commandBus.execute(
      new CreateTodoItemCommand(
        todoListId,
        userId,
        title,
        description,
        priority,
      ),
    );
  }

  @ApiOperation({ summary: 'Delete a Todo Item from a Todo List' })
  @ApiResponse({ status: 204, description: 'Todo Item successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Todo Item not found.' })
  @ApiQuery({
    name: 'todoListId',
    description:
      'The ID of the Todo List from which the Todo Item will be deleted',
    example: '615c3415e9b7a8a1e8f643a7',
  })
  @ApiParam({
    name: 'todoItemId',
    description: 'The ID of the Todo Item to be deleted',
    example: '615c3415e9b7a8a1e8f643a8',
  })
  @Delete('/:todoItemId')
  async deleteTodoItem(
    @Query('todoListId') todoListId: string,
    @Param('todoItemId') todoItemId: string,
    @Req() req: any,
  ): Promise<void> {
    const userId = req.user.userId;

    return this.commandBus.execute(
      new DeleteTodoItemCommand(todoListId, todoItemId, userId),
    );
  }
}
