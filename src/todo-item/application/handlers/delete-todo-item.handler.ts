// src/todo-item/application/handlers/delete-todo-item.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoItemCommand } from '../commands/delete-todo-item.command';
import { TodoListCommandRepository } from 'src/todo-list/infrastructure/repositories/todo-list.command.model';
import { TodoItemCommandRepository } from 'src/todo-item/infrastructure/repositories/todo-item.command.repository';
import { TodoListQueryRepository } from 'src/todo-list/infrastructure/repositories/todo-list.query.repository';
import { ObjectId } from 'mongodb';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemHandler
  implements ICommandHandler<DeleteTodoItemCommand>
{
  constructor(
    private readonly todoListCommandRepository: TodoListCommandRepository,
    private readonly todoListQueryRepository: TodoListQueryRepository,
    private readonly todoItemCommandRepository: TodoItemCommandRepository,
  ) {}

  async execute(command: DeleteTodoItemCommand): Promise<{ message: string }> {
    const { todoListId, todoItemId, userId } = command;
    const todoListObjectId = new ObjectId(todoListId);
    const todoItemObjectId = new ObjectId(todoItemId);
    const userObjectId = new ObjectId(userId);

    const todoList = await this.todoListQueryRepository.findOne(
      todoListObjectId,
      userObjectId,
    );

    if (!todoList) {
      throw new NotFoundException('Todo List not found.');
    }

    const todoItems = todoList.todoItems.filter(
      (listId) => !listId.equals(todoItemObjectId),
    );

    await this.todoListCommandRepository.updateTodoItem(
      todoListObjectId,
      todoItems,
    );

    const result =
      await this.todoItemCommandRepository.deleteOne(todoItemObjectId);

    if (!result.deletedCount)
      throw new NotFoundException('todo item not found');

    return { message: 'todo item removed successfully.' };
  }
}
