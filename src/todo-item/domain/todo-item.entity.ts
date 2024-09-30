import { ObjectId } from 'mongodb';

export class TodoItem {
  private _id: ObjectId | null;
  private _title: string;
  private _description: string;
  private _priority: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _todoListId: ObjectId;
  private constructor(
    id: ObjectId | null,
    title: string,
    description: string,
    priority: number,
    createdAt: Date,
    updatedAt: Date,
    todoListId: ObjectId,
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._priority = priority;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._todoListId = todoListId;
  }

  static create(
    title: string,
    description: string,
    priority: number,
    todoListId: ObjectId,
  ): TodoItem {
    const now = new Date();
    return new TodoItem(
      null,
      title,
      description,
      priority,
      now,
      now,
      todoListId,
    );
  }

  get id(): ObjectId | null {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get priority(): number {
    return this._priority;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get todoListId(): ObjectId {
    return this._todoListId;
  }
  updatePriority(newPriority: number): void {
    this._priority = newPriority;
    this._updatedAt = new Date();
  }
}
