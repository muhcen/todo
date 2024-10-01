export class LogTodoListCreationCommand {
  constructor(
    public readonly todoListId: string,
    public readonly userId: string,
  ) {}
}
