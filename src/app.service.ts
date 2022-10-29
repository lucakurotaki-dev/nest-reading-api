import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Im NestJS! And Im beeing watched now!';
  }
}
