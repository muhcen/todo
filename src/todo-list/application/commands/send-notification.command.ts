export class SendNotificationCommand {
  constructor(
    public readonly userId: string,
    public readonly todoListId: string,
  ) {}
}
