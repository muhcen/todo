export class UpdateTodoItemCommand {
  constructor(
    public readonly todoListId: string,
    public readonly todoItemId: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly priority: number,
  ) {}
}
