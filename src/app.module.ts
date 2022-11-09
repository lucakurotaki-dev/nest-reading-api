import { Module } from '@nestjs/common';
import { ReadingModule } from './modules/readings/reading.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [UserModule, ReadingModule],
})
export class AppModule {}
