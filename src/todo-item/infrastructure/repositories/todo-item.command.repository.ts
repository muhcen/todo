// src/user/infrastructure/repositories/user-command.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from 'src/users/domain/user.entity';
import { ObjectId } from 'mongodb';
import { UserCommandRepositoryInterface } from 'src/users/domain/repositories/user-command.repository.interface';
import { TodoItemCommandModel } from '../models/todo-item.command.model';

@Injectable()
export class TodoItemCommandRepository {
  constructor(
    @InjectRepository(TodoItemCommandModel)
    private readonly todoCommandRepository: MongoRepository<TodoItemCommandModel>,
  ) {}
}
