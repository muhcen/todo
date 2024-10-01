// src/user/infrastructure/repositories/user-command.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from 'src/users/domain/user.entity';
import { ObjectId } from 'mongodb';
import { UserCommandRepositoryInterface } from 'src/users/domain/repositories/user-command.repository.interface';
import { TodoItemCommandModel } from '../models/todo-item.command.model';
import { TodoItem } from 'src/todo-item/domain/todo-item.entity';
import { TodoItemQueryModel } from '../models/todo-item.query.model';

@Injectable()
export class TodoItemQueryRepository {
  constructor(
    @InjectRepository(TodoItemCommandModel)
    private readonly todoItemQueryRepository: MongoRepository<TodoItemQueryModel>,
  ) {}

  findItemsByIds(todoItemIds: ObjectId[]) {
    return this.todoItemQueryRepository.find({
      where: { _id: { $in: todoItemIds } },
    });
  }
}
