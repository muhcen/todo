import { ObjectId } from 'mongodb';
import { TodoItem } from 'src/todo-item/domain/todo-item.entity';
import { TodoItemQueryModel } from 'src/todo-item/infrastructure/models/todo-item.query.model';

export class TodoList {
  private _id: ObjectId | null;
  private _title: string;
  private _userId: string;
  private _todoItems: TodoItemQueryModel[] = [];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: ObjectId | null,
    title: string,
    userId: string,
    todoItems: TodoItemQueryModel[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this._id = id;
    this._title = title;
    this._userId = userId;
    this._todoItems = todoItems;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  static create(title: string, userId: string): TodoList {
    const now = new Date();
    return new TodoList(null, title, userId, [], now, now);
  }

  get id(): ObjectId | null {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get userId(): string {
    return this._userId;
  }

  get todoItems(): TodoItemQueryModel[] {
    return this._todoItems;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  sortItemsByPriority(): void {
    this.todoItems.sort((a, b) => a.priority - b.priority);
  }
}
