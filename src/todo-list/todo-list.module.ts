import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListCommandModel } from './infrastructure/models/todo-list.command.model';
import { TodoListCommandRepository } from './infrastructure/repositories/todo-list.command.model';
import { TodoListsController } from './adapters/todo-list.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateTodoListHandler } from './application/handlers/create-todo-list.handler';
import { UsersModule } from 'src/users/users.module';
import { DeleteTodoListHandler } from './application/handlers/delete-todo-list.handler';
import { UpdateTodoListHandler } from './application/handlers/update-todo-list.handler';
import { TodoListQueryRepository } from './infrastructure/repositories/todo-list.query.repository';
import { TodoListQueryModel } from './infrastructure/models/todo-list.query.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoListCommandModel, TodoListQueryModel]),
    CqrsModule,
    UsersModule,
  ],
  controllers: [TodoListsController],
  providers: [
    TodoListCommandRepository,
    TodoListQueryRepository,
    CreateTodoListHandler,
    DeleteTodoListHandler,
    UpdateTodoListHandler,
  ],

  exports: [TodoListCommandRepository, TodoListQueryRepository],
})
export class TodoListModule {}
