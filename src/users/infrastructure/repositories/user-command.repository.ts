// src/user/infrastructure/repositories/user-command.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserCommandModel } from '../models/user-command.model';
import { User } from 'src/users/domain/user.entity';
import { ObjectId } from 'mongodb';
import { UserCommandRepositoryInterface } from 'src/users/domain/repositories/user-command.repository.interface';
import { TodoListCommandModel } from 'src/todo-list/infrastructure/models/todo-list.command.model';
import { UserQueryModel } from '../models/user-query.model';

@Injectable()
export class UserCommandRepository implements UserCommandRepositoryInterface {
  constructor(
    @InjectRepository(UserCommandModel)
    private readonly userCommandRepository: MongoRepository<UserCommandModel>,
  ) {}
  async deleteById(userId: string): Promise<void> {
    await this.userCommandRepository.delete(userId);
  }

  async save(user: User): Promise<UserCommandModel> {
    const userEntity = this.userCommandRepository.create({
      username: user.username,
      password: user.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedUser = await this.userCommandRepository.save(userEntity);

    return savedUser;
  }

  updateTodoList(userId: string, todoListIds: ObjectId[]) {
    return this.userCommandRepository.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { todoLists: todoListIds } },
    );
  }
}
