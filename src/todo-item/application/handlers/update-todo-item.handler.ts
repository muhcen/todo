// src/todo-item/application/handlers/update-todo-item.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../commands/update-todo-item.command';
import { TodoListCommandRepository } from 'src/todo-list/infrastructure/repositories/todo-list.command.model';
import { TodoItemCommandRepository } from 'src/todo-item/infrastructure/repositories/todo-item.command.repository';
import { NotFoundException } from '@nestjs/common';
import { TodoListQueryRepository } from 'src/todo-list/infrastructure/repositories/todo-list.query.repository';
import { ObjectId } from 'mongodb';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemHandler
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(
    private readonly todoListQueryRepository: TodoListQueryRepository,
    private readonly todoItemCommandRepository: TodoItemCommandRepository,
  ) {}

  async execute(command: UpdateTodoItemCommand): Promise<{ message: string }> {
    const { todoListId, todoItemId, userId, title, description, priority } =
      command;

    let update = {};

    if (title) update['title'] = title;
    if (description) update['description'] = description;
    if (priority) update['priority'] = priority;

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

    const result = await this.todoItemCommandRepository.updateOne(
      {
        _id: todoItemObjectId,
        todoListId: todoListObjectId,
      },
      { title, description, priority },
    );

    if (!result.matchedCount) {
      throw new NotFoundException('Todo item not found');
    }

    return { message: 'todo list updated successfully' };
  }
}
