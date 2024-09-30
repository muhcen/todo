import { ObjectId } from 'mongodb';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { TodoItemQueryModel } from 'src/todo-item/infrastructure/models/todo-item.query.model';
import { UserQueryModel } from 'src/users/infrastructure/models/user-query.model';

@Entity('todo_lists')
export class TodoListQueryModel {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column()
  user: ObjectId;

  @Column({ type: 'array' })
  todoItems: ObjectId[] = [];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
