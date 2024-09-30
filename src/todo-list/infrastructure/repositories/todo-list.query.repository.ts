// src/user/infrastructure/repositories/user-command.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { TodoListCommandModel } from '../models/todo-list.command.model';
import { TodoList } from 'src/todo-list/domain/todo-list.entity';
import { UserCommandModel } from 'src/users/infrastructure/models/user-command.model';
import { UserQueryModel } from 'src/users/infrastructure/models/user-query.model';
import { ObjectId } from 'mongodb';
import { TodoListQueryModel } from '../models/todo-list.query.model';

@Injectable()
export class TodoListQueryRepository {
  constructor(
    @InjectRepository(TodoListQueryModel)
    private readonly todoListQueryRepository: MongoRepository<TodoListQueryModel>,
  ) {}
  findOne(todoListId: ObjectId, userId: ObjectId) {
    return this.todoListQueryRepository.findOne({
      where: {
        _id: todoListId,
        userId: userId,
      },
    });
  }
}
