export class UpdateTodoListCommand {
  constructor(
    public readonly todoListId: string,
    public readonly userId: string,
    public readonly title: string,
  ) {}
}
