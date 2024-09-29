export class UserSignedUpEvent {
  constructor(
    public readonly userId: string,
    public readonly username: string,
  ) {}
}
