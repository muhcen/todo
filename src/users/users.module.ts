import { Module } from '@nestjs/common';
import { UsersController } from './adapters/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQueryModel } from './infrastructure/models/user-query.model';
import { UserCommandModel } from './infrastructure/models/user-command.model';
import { AuthController } from './adapters/auth.controller';
import { UserCommandRepository } from './infrastructure/repositories/user-command.repository';
import { SignupUserHandler } from './application/handlers/signup-user.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UserQueryRepository } from './infrastructure/repositories/user-query.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from './application/services/authentication.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCommandModel, UserQueryModel]),
    CqrsModule,
    JwtModule.register({
      secret: 'SecretKey',
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    SignupUserHandler,
    UserCommandRepository,
    UserQueryRepository,
    AuthenticationService,
  ],
})
export class UsersModule {}
