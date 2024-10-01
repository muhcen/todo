import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import { TodoListQueryRepository } from 'src/todo-list/infrastructure/repositories/todo-list.query.repository';
import { GetTodoListByIdQuery } from '../commands/get-todo-list-by-id.query';
import { NotFoundException } from '@nestjs/common';
import { TodoItemQueryRepository } from 'src/todo-item/infrastructure/repositories/todo-item.query.repository';
import { TodoList } from 'src/todo-list/domain/todo-list.entity';

@QueryHandler(GetTodoListByIdQuery)
export class GetTodoListByIdHandler
  implements IQueryHandler<GetTodoListByIdQuery>
{
  constructor(
    private readonly todoListQueryRepository: TodoListQueryRepository,
    private readonly todoItemQueryRepository: TodoItemQueryRepository,
  ) {}

  async execute(query: GetTodoListByIdQuery): Promise<any> {
    const { todoListId, userId } = query;
    const todoListObjectId = new ObjectId(todoListId);
    const userObjectId = new ObjectId(userId);

    const todoList = await this.todoListQueryRepository.findOne(
      todoListObjectId,
      userObjectId,
    );

    if (!todoList) {
      throw new NotFoundException('Todo List not found.');
    }

    let todoItems = await this.todoItemQueryRepository.findItemsByIds(
      todoList.todoItems,
    );

    const todoListEntity = new TodoList(
      todoList._id,
      todoList.title,
      todoList.userId.toString(),
      todoItems,
      todoList.createdAt,
      todoList.updatedAt,
    );

    todoListEntity.sortItemsByPriority();

    return { todoList: todoListEntity };
  }
}
