import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemCommandModel } from './infrastructure/models/todo-item.command.model';
import { TodoItemCommandRepository } from './infrastructure/repositories/todo-item.command.repository';
import { TodoItemController } from './adapters/todo-item.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AddTodoItemHandler } from './application/handlers/add-todo-item.handler';
import { TodoListModule } from 'src/todo-list/todo-list.module';
import { DeleteTodoItemHandler } from './application/handlers/delete-todo-item.handler';
import { UpdateTodoItemHandler } from './application/handlers/update-todo-item.handler';
import { TodoItemQueryModel } from './infrastructure/models/todo-item.query.model';
import { TodoItemQueryRepository } from './infrastructure/repositories/todo-item.query.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoItemCommandModel, TodoItemQueryModel]),
    CqrsModule,
    forwardRef(() => TodoListModule),
  ],
  controllers: [TodoItemController],
  providers: [
    TodoItemCommandRepository,
    AddTodoItemHandler,
    DeleteTodoItemHandler,
    UpdateTodoItemHandler,
    TodoItemQueryRepository,
  ],

  exports: [TodoItemQueryRepository],
})
export class TodoItemModule {}
