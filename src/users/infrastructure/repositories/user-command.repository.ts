// src/user/infrastructure/repositories/user-command.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserCommandModel } from '../models/user-command.model';
import { User } from 'src/users/domain/user.entity';
import { ObjectId } from 'mongodb';
import { UserCommandRepositoryInterface } from 'src/users/domain/repositories/user-command.repository.interface';

@Injectable()
export class UserCommandRepository implements UserCommandRepositoryInterface {
  constructor(
    @InjectRepository(UserCommandModel)
    private readonly userCommandRepository: MongoRepository<UserCommandModel>,
  ) {}

  async save(user: User): Promise<User> {
    const userEntity = this.userCommandRepository.create({
      username: user.username,
      password: user.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedUser = await this.userCommandRepository.save(userEntity);

    return new User(
      savedUser._id,
      savedUser.username,
      savedUser.password,
      savedUser.createdAt,
      savedUser.updatedAt,
    );
  }
}
