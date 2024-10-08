import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SignupUserCommand } from '../commands/signup-user.command';
import { UserCommandRepository } from '../../infrastructure/repositories/user-command.repository';
import { User } from 'src/users/domain/user.entity';
import * as bcrypt from 'bcryptjs';
import { UserDto } from '../dto/user.dto';
import { ConflictException } from '@nestjs/common';
import { UserQueryRepository } from 'src/users/infrastructure/repositories/user-query.repository';
import { AuthenticationService } from '../services/authentication.service';
import { UserSignedUpEvent } from '../events/user-signed-up.event';

@CommandHandler(SignupUserCommand)
export class SignupUserHandler implements ICommandHandler<SignupUserCommand> {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly userQueryRepository: UserQueryRepository,
    private readonly authenticationService: AuthenticationService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: SignupUserCommand,
  ): Promise<{ user: UserDto; token: string }> {
    const { username, password } = command;

    const existingUser =
      await this.userQueryRepository.findByUsername(username);
    if (existingUser) throw new ConflictException('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create(username, hashedPassword);

    const savedUser = await this.userCommandRepository.save(newUser);

    this.eventBus.publish(
      new UserSignedUpEvent(savedUser._id!.toString(), savedUser.username),
    );

    const token = await this.authenticationService.generateJwtToken(
      savedUser._id!.toString(),
      savedUser.username,
    );

    return { user: UserDto.fromDomain(savedUser), token: token };
  }
}
