import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../commands/create-todo-list.command';
import { TodoListCommandRepository } from 'src/todo-list/infrastructure/repositories/todo-list.command.model';
import { TodoList } from 'src/todo-list/domain/todo-list.entity';
import { TodoListCommandModel } from 'src/todo-list/infrastructure/models/todo-list.command.model';
import { UserQueryRepository } from 'src/users/infrastructure/repositories/user-query.repository';
import { NotFoundException } from '@nestjs/common';
import { UserCommandRepository } from 'src/users/infrastructure/repositories/user-command.repository';
import { TodoListCreatedEvent } from '../events/todo-list-created.event';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListHandler
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(
    private readonly todoListCommandRepository: TodoListCommandRepository,
    private readonly userQueryRepository: UserQueryRepository,
    private readonly userCommandRepository: UserCommandRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTodoListCommand): Promise<TodoListCommandModel> {
    const { title, userId } = command;

    const user = await this.userQueryRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const todoListEntity = TodoList.create(title, userId);

    const savedTodoList = await this.todoListCommandRepository.save(
      todoListEntity,
      user,
    );

    const userTodoLists = [...user.todoLists, savedTodoList._id];
    await this.userCommandRepository.updateTodoList(
      user._id.toString(),
      userTodoLists,
    );

    this.eventBus.publish(
      new TodoListCreatedEvent(savedTodoList._id.toString(), userId),
    );

    return savedTodoList;
  }
}
