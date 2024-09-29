import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth(): object {
    return {
      status: 'ok',
      message: 'The API is healthy!',
      timestamp: new Date().toISOString(),
    };
  }
}
