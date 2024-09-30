import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemCommandModel } from './infrastructure/models/todo-item.command.model';
import { TodoItemCommandRepository } from './infrastructure/repositories/todo-item.command.repository';
import { TodoItemController } from './adapters/todo-item.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AddTodoItemHandler } from './application/handlers/add-todo-item.handler';
import { TodoListModule } from 'src/todo-list/todo-list.module';
import { DeleteTodoItemHandler } from './application/handlers/delete-todo-item.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoItemCommandModel]),
    CqrsModule,
    TodoListModule,
  ],
  controllers: [TodoItemController],
  providers: [
    TodoItemCommandRepository,
    AddTodoItemHandler,
    DeleteTodoItemHandler,
  ],
})
export class TodoItemModule {}
