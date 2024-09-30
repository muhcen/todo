import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListCommandModel } from './infrastructure/models/todo-list.command.model';
import { TodoListCommandRepository } from './infrastructure/repositories/todo-list.command.model';
import { TodoListsController } from './adapters/todo-list.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoListHandler } from './application/handlers/create-todo-list.handler';
import { UserQueryRepository } from 'src/users/infrastructure/repositories/user-query.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoListCommandModel]),
    CqrsModule,
    UsersModule,
  ],
  controllers: [TodoListsController],
  providers: [TodoListCommandRepository, CreateTodoListHandler],
})
export class TodoListModule {}
