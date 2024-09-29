import { ObjectId } from 'mongodb';

export interface IUserQuery {
  _id: ObjectId;
  username: string;
}
