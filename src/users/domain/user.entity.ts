import { ObjectId } from 'mongodb';

export class User {
  toObject(): { [x: string]: any; password: any } {
    throw new Error('Method not implemented.');
  }
  constructor(
    private _id: ObjectId | null,
    private _username: string,
    private _password: string,
    private _createdAt: Date | null,
    private _updatedAt: Date | null,
  ) {}

  get id(): ObjectId | undefined {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
  static create(username: string, password: string): User {
    return new User(null, username, password, null, null);
  }
}
