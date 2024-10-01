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
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/application/guard/jwt-auth.guard';
import { CreateTodoListDto } from '../application/dto/create-todo-list.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../application/commands/create-todo-list.command';
import { DeleteTodoListCommand } from '../application/commands/delete-todo-list.command';
import { UpdateTodoListDto } from '../application/dto/update-todo-list.dto';
import { UpdateTodoListCommand } from '../application/commands/update-todo-list-title.command';
import { GetTodoListByIdQuery } from '../application/commands/get-todo-list-by-id.query';

@ApiBearerAuth()
@ApiTags('todo-lists')
@Controller('todo-lists')
@UseGuards(JwtAuthGuard)
export class TodoListsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create a new Todo List' })
  @ApiResponse({ status: 201, description: 'Todo List created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Todo List' })
  @ApiResponse({ status: 204, description: 'Todo List successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Todo List not found.' })
  async deleteTodoList(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<void> {
    const userId = req.user.userId;
    return this.commandBus.execute(new DeleteTodoListCommand(id, userId));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Todo List Title' })
  @ApiResponse({
    status: 200,
    description: 'Todo List title successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Todo List not found.' })
  async updateTodoListTitle(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
    @Req() req: any,
  ): Promise<void> {
    const userId = req.user.userId;
    const { title } = updateTodoListDto;
    return this.commandBus.execute(
      new UpdateTodoListCommand(id, userId, title),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':todoListId')
  @ApiOperation({
    summary: 'Get a Todo List by ID with items sorted by priority',
  })
  @ApiResponse({ status: 200, description: 'Todo List fetched successfully.' })
  @ApiResponse({ status: 404, description: 'Todo List not found.' })
  @ApiParam({
    name: 'todoListId',
    description: 'The ID of the Todo List to fetch',
    example: '615c3415e9b7a8a1e8f643a7',
  })
  async getTodoListById(
    @Param('todoListId') todoListId: string,
    @Req() req: any,
  ): Promise<any> {
    const userId = req.user.userId;
    return this.queryBus.execute(new GetTodoListByIdQuery(todoListId, userId));
  }
}
