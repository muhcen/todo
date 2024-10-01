export class TodoListCreatedEvent {
  constructor(
    public readonly todoListId: string,
    public readonly userId: string,
  ) {}
}
