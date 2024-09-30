export class CreateTodoListCommand {
  constructor(
    public readonly title: string,
    public readonly userId: string,
  ) {}
}
