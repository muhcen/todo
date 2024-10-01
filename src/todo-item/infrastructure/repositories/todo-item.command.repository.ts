// src/user/infrastructure/repositories/user-command.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from 'src/users/domain/user.entity';
import { ObjectId } from 'mongodb';
import { UserCommandRepositoryInterface } from 'src/users/domain/repositories/user-command.repository.interface';
import { TodoItemCommandModel } from '../models/todo-item.command.model';
import { TodoItem } from 'src/todo-item/domain/todo-item.entity';

@Injectable()
export class TodoItemCommandRepository {
  constructor(
    @InjectRepository(TodoItemCommandModel)
    private readonly todoItemCommandRepository: MongoRepository<TodoItemCommandModel>,
  ) {}

  async save(todoItem: TodoItem): Promise<TodoItemCommandModel> {
    const todoListEntity = this.todoItemCommandRepository.create({
      title: todoItem.title,
      description: todoItem.description,
      priority: todoItem.priority,
      todoListId: todoItem.todoListId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedTodoList =
      await this.todoItemCommandRepository.save(todoListEntity);

    return savedTodoList;
  }

  deleteOne(todoItemId: ObjectId) {
    return this.todoItemCommandRepository.deleteOne({
      _id: todoItemId,
    });
  }

  updateOne(query: object, update: object) {
    return this.todoItemCommandRepository.updateOne(query, { $set: update });
  }
}
