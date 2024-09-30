import { ObjectId } from 'mongodb';
import { TodoListQueryModel } from 'src/todo-list/infrastructure/models/todo-list.query.model';
import { IUserQuery } from 'src/users/application/interfaces/user-query.interface';
import { Entity, Column, ObjectIdColumn, OneToMany } from 'typeorm';

@Entity('user')
export class UserQueryModel implements IUserQuery {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  username: string;

  @Column({ type: 'array' })
  todoLists: ObjectId[] = [];
}
