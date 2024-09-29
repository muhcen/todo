// src/user/infrastructure/repositories/user-command.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { UserCommandModel } from '../models/user-command.model';
import { User } from 'src/users/domain/user.entity';
import { ObjectId } from 'mongodb';
import { UserQueryModel } from '../models/user-query.model';
import { UserQueryRepositoryInterface } from 'src/users/domain/repositories/user-query.repository';

@Injectable()
export class UserQueryRepository implements UserQueryRepositoryInterface {
  constructor(
    @InjectRepository(UserQueryModel)
    private readonly userQueryRepository: MongoRepository<UserQueryModel>,
  ) {}

  findByUsername(username: string): Promise<UserQueryModel> {
    return this.userQueryRepository.findOne({ where: { username } });
  }
}
