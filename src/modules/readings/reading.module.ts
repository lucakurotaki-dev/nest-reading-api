import { Module } from '@nestjs/common';
import { Repository } from '../global/constants/repositories';
import { PrismaUserRepository } from '../users/infrastructure/prisma/prisma-user.repository';
import { UserModule } from '../users/user.module';
import { PrismaReadingRepository } from './infrastructure/prisma/prisma-reading.repository';
import { ReadingResolver } from './reading.resolver';
import { ReadingService } from './reading.service';

@Module({
  imports: [UserModule],
  providers: [
    ReadingResolver,
    ReadingService,
    {
      provide: Repository.READING_REPOSITORY,
      useClass: PrismaReadingRepository,
    },
    { provide: Repository.USER_REPOSITORY, useClass: PrismaUserRepository },
  ],
})
export class ReadingModule {}
