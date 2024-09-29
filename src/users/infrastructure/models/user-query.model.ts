import { ObjectId } from 'mongodb';
import { IUserQuery } from 'src/users/application/interfaces/user-query.interface';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class UserQueryModel implements IUserQuery {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  username: string;
}
