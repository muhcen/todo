export class DeleteTodoListCommand {
  constructor(
    public readonly todoListId: string,
    public readonly userId: string,
  ) {}
}
