import { TodoListCommandModel } from 'src/todo-list/infrastructure/models/todo-list.command.model';
import { IUserCommand } from 'src/users/application/interfaces/user-command.interface';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectId,
  OneToMany,
} from 'typeorm';

@Entity('user')
export class UserCommandModel implements IUserCommand {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'array' })
  todoLists: ObjectId[] = [];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
