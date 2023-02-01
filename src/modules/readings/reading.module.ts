import { Module } from '@nestjs/common';
import { Repository } from '../global/constants/repositories';
import { PrismaReadingRepository } from './infrastructure/prisma/prisma-reading.repository';
import { ReadingResolver } from './reading.resolver';
import { ReadingService } from './reading.service';

@Module({
  providers: [
    ReadingResolver,
    ReadingService,
    {
      provide: Repository.READING_REPOSITORY,
      useClass: PrismaReadingRepository,
    },
  ],
})
export class ReadingModule {}
