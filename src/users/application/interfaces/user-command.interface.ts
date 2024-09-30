import { ObjectId } from 'mongodb';
import { TodoListCommandModel } from 'src/todo-list/infrastructure/models/todo-list.command.model';

export interface IUserCommand {
  username: string;
  password: string;
  todoLists: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
