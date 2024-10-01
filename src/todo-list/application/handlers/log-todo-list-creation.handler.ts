import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogTodoListCreationCommand } from '../commands/log-todo-list-creation.command';

@CommandHandler(LogTodoListCreationCommand)
export class LogTodoListCreationHandler
  implements ICommandHandler<LogTodoListCreationCommand>
{
  async execute(command: LogTodoListCreationCommand): Promise<void> {
    console.log(
      `TodoList Created: TodoListId=${command.todoListId}, UserId=${command.userId}`,
    );
  }
}
