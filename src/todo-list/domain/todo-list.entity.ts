import { ObjectId } from 'mongodb';
import { TodoItem } from 'src/todo-item/domain/todo-item.entity';

export class TodoList {
  private _id: ObjectId | null;
  private _title: string;
  private _userId: string;
  private _todoItems: TodoItem[] = [];
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor(
    id: ObjectId | null,
    title: string,
    userId: string,
    todoItems: TodoItem[],
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

  get todoItems(): TodoItem[] {
    return this._todoItems;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  updateTitle(newTitle: string): void {
    if (newTitle.length === 0 || newTitle.length > 255) {
      throw new Error('The title must be between 1 and 255 characters.');
    }
    this._title = newTitle;
    this._updatedAt = new Date();
  }

  addTodoItem(todoItem: TodoItem): void {
    this._todoItems.push(todoItem);
    this._updatedAt = new Date();
  }

  removeTodoItem(todoItemId: ObjectId): void {
    this._todoItems = this._todoItems.filter((item) => item.id !== todoItemId);
    this._updatedAt = new Date();
  }

  findTodoItem(todoItemId: ObjectId): TodoItem | undefined {
    return this._todoItems.find((item) => item.id === todoItemId);
  }

  touch(): void {
    this._updatedAt = new Date();
  }
}
