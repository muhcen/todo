import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemCommandModel } from './infrastructure/models/todo-item.command.model';
import { TodoItemCommandRepository } from './infrastructure/repositories/todo-item.command.repository';
import { TodoItemController } from './adapters/todo-item.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItemCommandModel]), CqrsModule],
  controllers: [TodoItemController],
  providers: [TodoItemCommandRepository],
})
export class TodoItemModule {}
