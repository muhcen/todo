import { User } from '../user.entity';

export interface UserCommandRepositoryInterface {
  save(user: User): Promise<User>;
}
