import { UserCommandModel } from 'src/users/infrastructure/models/user-command.model';
import { User } from '../user.entity';

export interface UserCommandRepositoryInterface {
  save(user: User): Promise<UserCommandModel>;
  deleteById(userId: string): Promise<void>;
}
