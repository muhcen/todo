import { ObjectId } from 'mongodb';
import { TodoListCommandModel } from 'src/todo-list/infrastructure/models/todo-list.command.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('todo_items')
export class TodoItemCommandModel {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  priority: number;

  @Column({ type: 'array' })
  todoListId: ObjectId;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
