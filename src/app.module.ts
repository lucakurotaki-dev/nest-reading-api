import { Module } from '@nestjs/common';
import { GlobalModule } from './modules/global/global.module';
import { ReadingModule } from './modules/readings/reading.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [GlobalModule, UserModule, ReadingModule],
})
export class AppModule {}
