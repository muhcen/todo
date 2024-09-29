import { User } from 'src/users/domain/user.entity';
import { UserCommandModel } from 'src/users/infrastructure/models/user-command.model';

export class UserDto {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  static fromDomain(user: UserCommandModel): UserDto {
    return {
      id: user._id?.toString(),
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
