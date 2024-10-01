import { Injectable } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';
import { ofType } from '@nestjs/cqrs';
import { UserSignedUpEvent } from '../events/user-signed-up.event';
import { Observable, of, throwError } from 'rxjs';
import { concatMap, catchError, delay } from 'rxjs/operators';
import { UserCommandRepository } from 'src/users/infrastructure/repositories/user-command.repository';

@Injectable()
export class UserSignupSaga {
  constructor(private readonly userCommandRepository: UserCommandRepository) {}

  @Saga()
  userSignupSaga = (events$: Observable<any>): Observable<any> => {
    return events$.pipe(
      ofType(UserSignedUpEvent),
      concatMap((event: UserSignedUpEvent) => {
        console.log(`Saga triggered for user: ${event.username}`);

        return of(event).pipe(
          delay(1000),
          concatMap(() => {
            // if (Math.random() > 0.9) {
            //   console.log(`CRM registration failed for user ${event.username}`);
            //   throw Error('CRM registration failed');
            // }

            console.log(
              `Successfully registered ${event.username} in the CRM system`,
            );
            return of(event);
          }),
        );
      }),
      catchError(async (error: any) => {
        console.log(`Error during saga execution: ${error.message}`);
        const event = error.event;

        if (!event) {
          console.log('Event data missing during rollback');
          return of(null);
        }

        console.log(`Rolling back user signup for userId ${event.userId}`);
        await this.userCommandRepository.deleteById(event.userId);
        console.log(`Rollback complete for user ${event.username}`);

        return of({ type: 'CompensateUserSignupError', error });
      }),
    );
  };
}
