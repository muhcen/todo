import { UserQueryModel } from 'src/users/infrastructure/models/user-query.model';
import { User } from '../user.entity';

export interface UserQueryRepositoryInterface {
  findByUsername(username: string): Promise<UserQueryModel>;
}
