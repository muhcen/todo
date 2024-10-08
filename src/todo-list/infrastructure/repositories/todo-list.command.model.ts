// src/user/infrastructure/repositories/user-command.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { TodoListCommandModel } from '../models/todo-list.command.model';
import { TodoList } from 'src/todo-list/domain/todo-list.entity';
import { UserCommandModel } from 'src/users/infrastructure/models/user-command.model';
import { UserQueryModel } from 'src/users/infrastructure/models/user-query.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class TodoListCommandRepository {
  constructor(
    @InjectRepository(TodoListCommandModel)
    private readonly todoListCommandRepository: MongoRepository<TodoListCommandModel>,
  ) {}

  async save(
    todoList: TodoList,
    user: UserQueryModel,
  ): Promise<TodoListCommandModel> {
    const todoListEntity = this.todoListCommandRepository.create({
      title: todoList.title,
      userId: user._id,
      todoItems: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedTodoList =
      await this.todoListCommandRepository.save(todoListEntity);

    return savedTodoList;
  }

  deleteOne(todoListId: string, userId: string) {
    return this.todoListCommandRepository.deleteOne({
      _id: new ObjectId(todoListId),
      userId: new ObjectId(userId),
    });
  }
  updateOne(query: object, update: object) {
    return this.todoListCommandRepository.updateOne(query, { $set: update });
  }

  updateTodoItem(todoListId: ObjectId, todoItemIds: ObjectId[]) {
    return this.todoListCommandRepository.updateOne(
      { _id: todoListId },
      { $set: { todoItems: todoItemIds } },
    );
  }
}
