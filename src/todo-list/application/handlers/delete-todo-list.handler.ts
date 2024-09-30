import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTodoListCommand } from '../commands/delete-todo-list.command';
import { UserCommandRepository } from '../../../users/infrastructure/repositories/user-command.repository';
import { TodoListCommandRepository } from 'src/todo-list/infrastructure/repositories/todo-list.command.model';
import { NotFoundException } from '@nestjs/common';
import { UserQueryRepository } from 'src/users/infrastructure/repositories/user-query.repository';
import { ObjectId } from 'mongodb';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListHandler
  implements ICommandHandler<DeleteTodoListCommand>
{
  constructor(
    private readonly todoListCommandRepository: TodoListCommandRepository,
    private readonly userCommandRepository: UserCommandRepository,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(command: DeleteTodoListCommand): Promise<{ message: string }> {
    const { todoListId, userId } = command;

    const result = await this.todoListCommandRepository.deleteOne(
      todoListId,
      userId,
    );
    if (!result.deletedCount)
      throw new NotFoundException('todo list not found');

    const user = await this.userQueryRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const todoLists = user.todoLists.filter(
      (listId) => !listId.equals(new ObjectId(todoListId)),
    );

    await this.userCommandRepository.updateTodoList(userId, todoLists);

    return { message: 'todo list removed successfully.' };
  }
}
