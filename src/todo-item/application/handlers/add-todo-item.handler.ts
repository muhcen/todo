// src/todo-item/application/handlers/add-todo-item.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import { CreateTodoItemCommand } from '../commands/add-todo-item.command';
import { TodoListCommandRepository } from 'src/todo-list/infrastructure/repositories/todo-list.command.model';
import { TodoItemCommandRepository } from 'src/todo-item/infrastructure/repositories/todo-item.command.repository';
import { TodoListQueryRepository } from 'src/todo-list/infrastructure/repositories/todo-list.query.repository';
import { TodoItem } from 'src/todo-item/domain/todo-item.entity';
import { NotFoundException } from '@nestjs/common';
import { TodoItemCommandModel } from '../../infrastructure/models/todo-item.command.model';

@CommandHandler(CreateTodoItemCommand)
export class AddTodoItemHandler
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor(
    private readonly todoListCommandRepository: TodoListCommandRepository,
    private readonly todoListQueryRepository: TodoListQueryRepository,
    private readonly todoItemCommandRepository: TodoItemCommandRepository,
  ) {}

  async execute(command: CreateTodoItemCommand): Promise<TodoItemCommandModel> {
    const { todoListId, userId, title, description, priority } = command;
    const todoListObjectId = new ObjectId(todoListId);
    const userObjectId = new ObjectId(userId);

    const todoList = await this.todoListQueryRepository.findOne(
      todoListObjectId,
      userObjectId,
    );
    if (!todoList) {
      throw new NotFoundException('Todo List not found');
    }

    const newTodoItem = TodoItem.create(
      title,
      description,
      priority,
      todoListObjectId,
    );

    const savedTodoItem =
      await this.todoItemCommandRepository.save(newTodoItem);

    todoList.todoItems.push(savedTodoItem._id);
    await this.todoListCommandRepository.updateOne(
      { _id: todoList._id },
      { todoItems: todoList.todoItems },
    );

    return savedTodoItem;
  }
}
