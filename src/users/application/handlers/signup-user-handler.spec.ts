import { Test, TestingModule } from '@nestjs/testing';
import { EventBus } from '@nestjs/cqrs';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/domain/user.entity';
import { SignupUserHandler } from 'src/users/application/handlers/signup-user.handler';
import { UserCommandRepository } from 'src/users/infrastructure/repositories/user-command.repository';
import { UserQueryRepository } from 'src/users/infrastructure/repositories/user-query.repository';
import { AuthenticationService } from 'src/users/application/services/authentication.service';
import { SignupUserCommand } from 'src/users/application/commands/signup-user.command';

describe('SignupUserHandler', () => {
  let handler: SignupUserHandler;
  let userCommandRepository: jest.Mocked<UserCommandRepository>;
  let userQueryRepository: jest.Mocked<UserQueryRepository>;
  let authenticationService: jest.Mocked<AuthenticationService>;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupUserHandler,
        {
          provide: UserCommandRepository,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: UserQueryRepository,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
        {
          provide: AuthenticationService,
          useValue: {
            generateJwtToken: jest.fn(),
          },
        },
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<SignupUserHandler>(SignupUserHandler);
    userCommandRepository = module.get(UserCommandRepository);
    userQueryRepository = module.get(UserQueryRepository);
    authenticationService = module.get(AuthenticationService);
    eventBus = module.get(EventBus);
  });

  it('should sign up a new user successfully', async () => {
    const command = new SignupUserCommand('testuser', 'password123');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const newUser = User.create('testuser', hashedPassword);
    const savedUser = { ...newUser, _id: '1' };
    const token = 'fake-jwt-token';

    userQueryRepository.findByUsername.mockResolvedValueOnce(null);
    userCommandRepository.save.mockResolvedValueOnce(savedUser as any);
    authenticationService.generateJwtToken.mockResolvedValueOnce(token);

    await handler.execute(command);

    expect(userQueryRepository.findByUsername).toHaveBeenCalledWith('testuser');
  });

  it('should throw ConflictException if username already exists', async () => {
    const command = new SignupUserCommand('existinguser', 'password123');
    userQueryRepository.findByUsername.mockResolvedValueOnce(
      User.create('existinguser', 'hashedpassword') as any,
    );

    await expect(handler.execute(command)).rejects.toThrow(ConflictException);
    expect(userQueryRepository.findByUsername).toHaveBeenCalledWith(
      'existinguser',
    );
    expect(userCommandRepository.save).not.toHaveBeenCalled();
    expect(authenticationService.generateJwtToken).not.toHaveBeenCalled();
    expect(eventBus.publish).not.toHaveBeenCalled();
  });
});
