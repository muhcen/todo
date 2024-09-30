import { ObjectId } from 'mongodb';
import { TodoItemCommandModel } from '../../../todo-item/infrastructure/models/todo-item.command.model';
import { UserCommandModel } from 'src/users/infrastructure/models/user-command.model';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('todo_lists')
export class TodoListCommandModel {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ObjectIdColumn()
  userId: ObjectId;

  @Column({ type: 'array' })
  todoItems: ObjectId[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
