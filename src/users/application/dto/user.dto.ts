import { User } from 'src/users/domain/user.entity';

export class UserDto {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;

  static fromDomain(user: User): UserDto {
    return {
      id: user.id?.toString(),
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
