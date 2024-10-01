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
import { UserSignedUpListener } from './application/listeners/user-signed-up.listener';
import { UserSignupSaga } from './application/sagas/user-signup.saga';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { JwtAuthGuard } from './application/guard/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserCommandModel, UserQueryModel]),
    CqrsModule,
    JwtModule.register({
      secret: 'SecretKey',
      signOptions: { expiresIn: '1y' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    SignupUserHandler,
    UserCommandRepository,
    UserQueryRepository,
    AuthenticationService,
    UserSignedUpListener,
    // UserSignupSaga,
    JwtStrategy,
    JwtAuthGuard,
  ],

  exports: [JwtAuthGuard, UserQueryRepository, UserCommandRepository],
})
export class UsersModule {}
