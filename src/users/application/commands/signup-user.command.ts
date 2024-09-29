export class SignupUserCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}
