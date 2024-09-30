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

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoListCommandModel]),
    CqrsModule,
    UsersModule,
  ],
  controllers: [TodoListsController],
  providers: [
    TodoListCommandRepository,
    CreateTodoListHandler,
    DeleteTodoListHandler,
    UpdateTodoListHandler,
  ],
})
export class TodoListModule {}
