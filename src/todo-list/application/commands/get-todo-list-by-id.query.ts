export class GetTodoListByIdQuery {
  constructor(
    public readonly todoListId: string,
    public readonly userId: string,
  ) {}
}
