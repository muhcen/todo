import { Injectable } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';
import { ofType } from '@nestjs/cqrs';
import { UserSignedUpEvent } from '../events/user-signed-up.event';
import { delay, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { UserCommandRepository } from 'src/users/infrastructure/repositories/user-command.repository';

@Injectable()
export class UserSignupSaga {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  @Saga()
  userSignupSaga = (events$: Observable<any>): Observable<any> => {
    return events$.pipe(
      ofType(UserSignedUpEvent),
      mergeMap((event: UserSignedUpEvent) => {
        console.log(`Saga triggered for user: ${event.username}`);

        return of(event).pipe(
          delay(1000),
          mergeMap(() => {
            if (Math.random() > 0.9)
              return throwError({ message: 'CRM registration failed', event });

            console.log(
              `Successfully registered ${event.username} in the CRM system`,
            );
            return of(event);
          }),
        );
      }),
      catchError((error: any) => {
        console.log(`Error during saga execution: ${error.message}`);

        const event = error.event;
        if (!event) {
          return of(null);
        }

        return of(null).pipe(
          mergeMap(async () => {
            console.log(`Rolling back user signup for userId ${event.userId}`);
            await this.userCommandRepository.deleteById(event.userId);
            console.log(`Rollback complete for user ${event.username}`);
            return of({ type: 'CompensateUserSignupError', error });
          }),
        );
      }),
    );
  };
}
