import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendNotificationCommand } from '../commands/send-notification.command';

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler
  implements ICommandHandler<SendNotificationCommand>
{
  async execute(command: SendNotificationCommand): Promise<void> {
    console.log(`Sending notification to UserId=${command.userId}`);
  }
}
