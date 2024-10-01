import { Injectable } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';
import { ofType } from '@nestjs/cqrs';
import { Observable, of, throwError } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';
import { TodoListCreatedEvent } from '../events/todo-list-created.event';
import { SendNotificationCommand } from '../commands/send-notification.command';
import { LogTodoListCreationCommand } from '../commands/log-todo-list-creation.command';

@Injectable()
export class CreateTodoListSaga {
  @Saga()
  todoListCreationSaga = (events$: Observable<any>): Observable<any> => {
    return events$.pipe(
      ofType(TodoListCreatedEvent),
      concatMap((event: TodoListCreatedEvent) => {
        try {
          return [
            new SendNotificationCommand(event.todoListId, event.userId),
            new LogTodoListCreationCommand(event.todoListId, event.userId),
          ];
        } catch (error) {
          console.error(`Error during saga execution: ${error.message}`);
          return throwError(() => error);
        }
      }),
      catchError((error) => {
        console.log('Error caught in Saga:', error);
        return of(null);
      }),
    );
  };
}
