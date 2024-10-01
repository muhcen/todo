import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserSignedUpEvent } from '../events/user-signed-up.event';

@EventsHandler(UserSignedUpEvent)
export class UserSignedUpListener implements IEventHandler<UserSignedUpEvent> {
  handle(event: UserSignedUpEvent) {
    console.log(
      `User signed up with ID: ${event.userId}, Username: ${event.username}`,
    );
  }
}
