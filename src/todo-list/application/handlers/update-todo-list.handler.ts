import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoListCommand } from '../commands/update-todo-list-title.command';
import { TodoListCommandRepository } from 'src/todo-list/infrastructure/repositories/todo-list.command.model';
import { ObjectId } from 'mongodb';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListHandler
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(
    private readonly todoListCommandRepository: TodoListCommandRepository,
  ) {}

  async execute(command: UpdateTodoListCommand): Promise<{ message: string }> {
    const { todoListId, userId, title } = command;
    const todoListObjectId = new ObjectId(todoListId);
    const userObjectId = new ObjectId(userId);

    const result = await this.todoListCommandRepository.updateOne(
      {
        _id: todoListObjectId,
        userId: userObjectId,
      },
      { title: title },
    );

    if (!result.matchedCount) {
      throw new NotFoundException('Todo List not found');
    }

    return { message: 'todo list updated successfully' };
  }
}
